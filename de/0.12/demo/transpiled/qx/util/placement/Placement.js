(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.util.placement.DirectAxis": {
        "construct": true
      },
      "qx.util.placement.KeepAlignAxis": {},
      "qx.util.placement.BestFitAxis": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * Contains methods to compute a position for any object which should
   * be positioned relative to another object.
   */
  qx.Class.define("qx.util.placement.Placement", {
    extend: qx.core.Object,
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_306_0 = qx.util.placement.DirectAxis;
    },
    properties: {
      /**
       * The axis object to use for the horizontal placement
       */
      axisX: {
        check: "Class"
      },

      /**
       * The axis object to use for the vertical placement
       */
      axisY: {
        check: "Class"
      },

      /**
       * Specify to which edge of the target object, the object should be attached
       */
      edge: {
        check: ["top", "right", "bottom", "left"],
        init: "top"
      },

      /**
       * Specify with which edge of the target object, the object should be aligned
       */
      align: {
        check: ["top", "right", "bottom", "left", "center", "middle"],
        init: "right"
      }
    },
    statics: {
      __P_306_1: null,

      /**
       * DOM and widget independent method to compute the location
       * of an object to make it relative to any other object.
       *
       * @param size {Map} With the keys <code>width</code> and <code>height</code>
       *   of the object to align
       * @param area {Map} Available area to position the object. Has the keys
       *   <code>width</code> and <code>height</code>. Normally this is the parent
       *   object of the one to align.
       * @param target {Map} Location of the object to align the object to. This map
       *   should have the keys <code>left</code>, <code>top</code>, <code>right</code>
       *   and <code>bottom</code>.
       * @param offsets {Map} Map with all offsets for each direction.
       *   Comes with the keys <code>left</code>, <code>top</code>,
       *   <code>right</code> and <code>bottom</code>.
       * @param position {String} Alignment of the object on the target, any of
       *   "top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right",
       *   "left-top", "left-middle", "left-bottom", "right-top", "right-middle", "right-bottom".
       * @param modeX {String} Horizontal placement mode. Valid values are:
       *   <ul>
       *   <li><code>direct</code>: place the object directly at the given
       *   location.</li>
       *   <li><code>keep-align</code>: if parts of the object is outside of the visible
       *   area it is moved to the best fitting 'edge' and 'alignment' of the target.
       *   It is guaranteed the the new position attaches the object to one of the
       *   target edges and that that is aligned with a target edge.</li>
       *   <li>best-fit</li>: If parts of the object are outside of the visible
       *   area it is moved into the view port ignoring any offset, and position
       *   values.
       *   </ul>
       * @param modeY {String} Vertical placement mode. Accepts the same values as
       *   the 'modeX' argument.
       * @return {Map} A map with the final location stored in the keys
       *   <code>left</code> and <code>top</code>.
       */
      compute: function compute(size, area, target, offsets, position, modeX, modeY) {
        this.__P_306_1 = this.__P_306_1 || new qx.util.placement.Placement();
        var splitted = position.split("-");
        var edge = splitted[0];
        var align = splitted[1];

        this.__P_306_1.set({
          axisX: this.__P_306_2(modeX),
          axisY: this.__P_306_2(modeY),
          edge: edge,
          align: align
        });

        return this.__P_306_1.compute(size, area, target, offsets);
      },
      __P_306_3: null,
      __P_306_4: null,
      __P_306_5: null,

      /**
       * Get the axis implementation for the given mode
       *
       * @param mode {String} One of <code>direct</code>, <code>keep-align</code> or
       *   <code>best-fit</code>
       * @return {qx.util.placement.AbstractAxis}
       */
      __P_306_2: function __P_306_2(mode) {
        switch (mode) {
          case "direct":
            this.__P_306_3 = this.__P_306_3 || qx.util.placement.DirectAxis;
            return this.__P_306_3;

          case "keep-align":
            this.__P_306_4 = this.__P_306_4 || qx.util.placement.KeepAlignAxis;
            return this.__P_306_4;

          case "best-fit":
            this.__P_306_5 = this.__P_306_5 || qx.util.placement.BestFitAxis;
            return this.__P_306_5;

          default:
            throw new Error("Invalid 'mode' argument!'");
        }
      }
    },
    members: {
      __P_306_0: null,

      /**
       * DOM and widget independent method to compute the location
       * of an object to make it relative to any other object.
       *
       * @param size {Map} With the keys <code>width</code> and <code>height</code>
       *   of the object to align
       * @param area {Map} Available area to position the object. Has the keys
       *   <code>width</code> and <code>height</code>. Normally this is the parent
       *   object of the one to align.
       * @param target {Map} Location of the object to align the object to. This map
       *   should have the keys <code>left</code>, <code>top</code>, <code>right</code>
       *   and <code>bottom</code>.
       * @param offsets {Map} Map with all offsets for each direction.
       *   Comes with the keys <code>left</code>, <code>top</code>,
       *   <code>right</code> and <code>bottom</code>.
       * @return {Map} A map with the final location stored in the keys
       *   <code>left</code> and <code>top</code>.
       */
      compute: function compute(size, area, target, offsets) {
        var axisX = this.getAxisX() || this.__P_306_0;

        var left = axisX.computeStart(size.width, {
          start: target.left,
          end: target.right
        }, {
          start: offsets.left,
          end: offsets.right
        }, area.width, this.__P_306_6());

        var axisY = this.getAxisY() || this.__P_306_0;

        var top = axisY.computeStart(size.height, {
          start: target.top,
          end: target.bottom
        }, {
          start: offsets.top,
          end: offsets.bottom
        }, area.height, this.__P_306_7());
        return {
          left: left,
          top: top
        };
      },

      /**
       * Get the position value for the horizontal axis
       *
       * @return {String} the position
       */
      __P_306_6: function __P_306_6() {
        var edge = this.getEdge();
        var align = this.getAlign();

        if (edge == "left") {
          return "edge-start";
        } else if (edge == "right") {
          return "edge-end";
        } else if (align == "left") {
          return "align-start";
        } else if (align == "center") {
          return "align-center";
        } else if (align == "right") {
          return "align-end";
        }
      },

      /**
       * Get the position value for the vertical axis
       *
       * @return {String} the position
       */
      __P_306_7: function __P_306_7() {
        var edge = this.getEdge();
        var align = this.getAlign();

        if (edge == "top") {
          return "edge-start";
        } else if (edge == "bottom") {
          return "edge-end";
        } else if (align == "top") {
          return "align-start";
        } else if (align == "middle") {
          return "align-center";
        } else if (align == "bottom") {
          return "align-end";
        }
      }
    },
    destruct: function destruct() {
      this._disposeObjects("__P_306_0");
    }
  });
  qx.util.placement.Placement.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Placement.js.map?dt=1603737761112