(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MNativeOverflow": {
        "require": true
      },
      "qx.bom.client.Engine": {},
      "qx.bom.client.Browser": {},
      "qx.theme.manager.Font": {},
      "qx.bom.Font": {},
      "qx.theme.manager.Color": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * The Html widget embeds plain HTML code into the application
   *
   * *Example*
   *
   * Here is a little example of how to use the canvas widget.
   *
   * <pre class='javascript'>
   * var html = new qx.ui.embed.Html();
   * html.setHtml("<h1>Hello World</h1>");
   * </pre>
   *
   * *External Documentation*
   *
   * <a href='http://qooxdoo.org/docs/#desktop/widget/html.md' target='_blank'>
   * Documentation of this widget in the qooxdoo manual.</a>
   */
  qx.Class.define("qx.ui.embed.Html", {
    extend: qx.ui.core.Widget,
    include: [qx.ui.core.MNativeOverflow],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param html {String} Initial HTML content
     */
    construct: function construct(html) {
      qx.ui.core.Widget.constructor.call(this);

      if (html != null) {
        this.setHtml(html);
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** Any text string which can contain HTML, too */
      html: {
        check: "String",
        apply: "_applyHtml",
        event: "changeHtml",
        nullable: true
      },

      /**
       * The css classname for the html embed.
       * <b>IMPORTANT</b> Paddings and borders does not work
       * in the css class. These styles cause conflicts with
       * the layout engine.
       */
      cssClass: {
        check: "String",
        init: "",
        apply: "_applyCssClass"
      },
      // overridden
      selectable: {
        refine: true,
        init: true
      },
      // overridden
      focusable: {
        refine: true,
        init: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        WIDGET API
      ---------------------------------------------------------------------------
      */
      getFocusElement: function getFocusElement() {
        return this.getContentElement();
      },

      /*
      ---------------------------------------------------------------------------
        APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyHtml: function _applyHtml(value, old) {
        var elem = this.getContentElement(); // Workaround for http://bugzilla.qooxdoo.org/show_bug.cgi?id=7679

        if (qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") == 9) {
          elem.setStyle("position", "relative");
        } // Insert HTML content


        elem.setAttribute("html", value || "");
      },
      // property apply
      _applyCssClass: function _applyCssClass(value, old) {
        this.getContentElement().removeClass(old);
        this.getContentElement().addClass(value);
      },
      // overridden
      _applySelectable: function _applySelectable(value) {
        qx.ui.embed.Html.prototype._applySelectable.base.call(this, value);
        /*
         * We have to set the value to "text" in Webkit for the content element
         */


        if (qx.core.Environment.get("engine.name") == "webkit") {
          this.getContentElement().setStyle("userSelect", value ? "text" : "none");
        }
      },

      /*
      ---------------------------------------------------------------------------
        FONT SUPPORT
      ---------------------------------------------------------------------------
      */
      // overridden
      _applyFont: function _applyFont(value, old) {
        var styles = value ? qx.theme.manager.Font.getInstance().resolve(value).getStyles() : qx.bom.Font.getDefaultStyles(); // check if text color already set - if so this local value has higher priority

        if (this.getTextColor() != null) {
          delete styles["color"];
        }

        this.getContentElement().setStyles(styles);
      },

      /*
      ---------------------------------------------------------------------------
        TEXT COLOR SUPPORT
      ---------------------------------------------------------------------------
      */
      // overridden
      _applyTextColor: function _applyTextColor(value, old) {
        if (value) {
          this.getContentElement().setStyle("color", qx.theme.manager.Color.getInstance().resolve(value));
        } else {
          this.getContentElement().removeStyle("color");
        }
      }
    }
  });
  qx.ui.embed.Html.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Html.js.map?dt=1590928197342