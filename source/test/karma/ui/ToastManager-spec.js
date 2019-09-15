
describe('test the NotificationCenter', function () {

  var center = cv.ui.ToastManager.getInstance();

  beforeEach(function() {
    center._init();
  });

  afterEach(function() {
    center.clear(true);
  });

  it("should test some basics", function () {
    var severities = center.getSeverities();
    expect(severities.indexOf("low")).toBeGreaterThanOrEqual(0);
    expect(severities.indexOf("normal")).toBeGreaterThanOrEqual(0);
    expect(severities.indexOf("high")).toBeGreaterThanOrEqual(0);
    expect(severities.indexOf("urgent")).toBeGreaterThanOrEqual(0);
  });

  it('should handle messages', function() {

    var message = {
      topic: "cv.test",
      title: "Title",
      message: "Test message",
      severity: "normal",
      target: "toast"
    };

    center.handleMessage(Object.assign({}, message));
    expect(center.getMessages().getLength()).toBe(1);

    // add message with higher severity
    message.severity = "high";
    message.unique = true;

    var messageId = center.__idCounter-1;
    center.handleMessage(Object.assign({}, message));
    // as the message was unique it replaces the old one
    expect(center.getMessages().getLength()).toBe(1);

    var messageElement = document.querySelector("#"+center.getMessageElementId()+messageId);
    expect(messageElement.classList.contains("high")).toBeTruthy();

    // add message with higher severity
    message.severity = "urgent";
    message.unique = false;

    messageId = center.__idCounter;
    center.handleMessage(Object.assign({}, message));
    // as the message was unique it replaces the old one
    expect(center.getMessages().getLength()).toBe(2);

    messageElement = document.querySelector("#"+center.getMessageElementId()+messageId);
    expect(messageElement.classList.contains("urgent")).toBeTruthy();

    // remove unique messages
    message.condition = false;
    message.unique = true;

    center.handleMessage(Object.assign({}, message));
    center.handleMessage(Object.assign({}, message));
    // as we had 2 messages with same topic both should be gone now
    expect(center.getMessages().getLength()).toBe(0);

  });

  it("should test the maxEntries limit", function() {
    center.setMaxEntries(5);
    var message = {
      topic: "cv.test",
      title: "Title",
      message: "Test message",
      severity: "normal",
      target: "toast"
    };

    for(var i=0; i< 10; i++) {
      var msg = Object.assign({}, message);
      msg.title = i;
      center.handleMessage(msg);
    }

    expect(center.getMessages().getLength()).toBe(5);
    expect(center.getMessages().getItem(0).title).toBe(5);

    message = center.getMessages().getItem(0);
    // delete a message by id
    expect(center.deleteMessage(message.id)).toBeTruthy();
    expect(center.getMessages().getLength()).toBe(4);
    expect(center.getMessages().getItem(0).title).toBe(6);

    // delete a message by index which is not deletable
    message = center.getMessages().getItem(0);
    message.deletable = false;
    expect(center.deleteMessage(message.id)).toBeFalsy();
    expect(center.getMessages().getLength()).toBe(4);
    expect(center.getMessages().getItem(0).title).toBe(6);
  });

  it("should perform a message action", function() {
    var spy = jasmine.createSpy();

    qx.Class.define("cv.test.ActionHandler", {
      extend: cv.core.notifications.actions.AbstractActionHandler,
      implement: cv.core.notifications.IActionHandler,

      members: {
        handleAction: function() {
          spy();
        },
        getDomElement: function() {
          return null;
        }
      }
    });
    cv.core.notifications.ActionRegistry.registerActionHandler("test", cv.test.ActionHandler);

    var message = {
      topic: "cv.test",
      title: "Title",
      message: "Test message",
      severity: "normal",
      actions: {
        test: [{
          needsConfirmation: false,
          deleteMessageAfterExecution: true
        }]
      },
      target: "toast"
    };
    center.handleMessage(message);
    center.performAction(center.getMessages().getLength()-1);
    expect(spy).toHaveBeenCalled();
    cv.core.notifications.ActionRegistry.unregisterActionHandler("test");

    // message should have been deleted by action execution
    expect(center.getMessages().getLength()).toEqual(0);

    qx.Class.undefine("cv.test.ActionHandler");
  });

  it("should test the interaction handling with list items", function() {
    if (window.PointerEvent) {
      // click on the message content
      var down = new PointerEvent("pointerdown", {
        bubbles: true,
        cancelable: true,
        view: window
      });
      var up = new PointerEvent("pointerup", {
        bubbles: true,
        cancelable: true,
        view: window
      });

      qx.Class.define("cv.test.ActionHandler", {
        extend: cv.core.notifications.actions.AbstractActionHandler,
        implement: cv.core.notifications.IActionHandler,

        members: {
          handleAction: function () {
          },
          getDomElement: function () {
            return null;
          }
        }
      });
      cv.core.notifications.ActionRegistry.registerActionHandler("test", cv.test.ActionHandler);

      spyOn(center, "deleteMessage");
      // test if message without action gets deleted
      var message = {
        topic: "cv.test",
        title: "Title",
        message: "Test message",
        severity: "normal",
        target: "toast"
      };
      var messageId = center.__idCounter;
      center.handleMessage(message);

      var element = document.querySelector("#"+center.getMessageElementId()+messageId);
      element.dispatchEvent(down);
      element.dispatchEvent(up);
      expect(center.deleteMessage).toHaveBeenCalledWith(messageId);

      message = {
        topic: "cv.test",
        title: "Title",
        message: "Test message",
        severity: "normal",
        actions: {
          test: [{
            needsConfirmation: false,
            deleteMessageAfterExecution: true
          }]
        },
        target: "toast"
      };

      center.handleMessage(message);

      element = document.querySelector("#"+center.getMessageElementId()+messageId);

      spyOn(center, "performAction");

      element.dispatchEvent(down);
      element.dispatchEvent(up);
      expect(center.performAction).toHaveBeenCalledWith(messageId, jasmine.any(qx.event.type.Event));

      center.deleteMessage(messageId);


    }
  });
});