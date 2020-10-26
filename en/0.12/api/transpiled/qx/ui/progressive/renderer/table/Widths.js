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
      "qx.ui.core.ColumnData": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2008 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * Column width array for a whole set of columns
   */
  qx.Class.define("qx.ui.progressive.renderer.table.Widths", {
    extend: qx.core.Object,

    /**
     * @param numColumns {Integer}
     *   The number of columns being used.
     */
    construct: function construct(numColumns) {
      qx.core.Object.constructor.call(this); // Create an array of the specified number of columns, and use the default
      // column data.

      this.__P_378_0 = [];

      for (var i = 0; i < numColumns; i++) {
        this.__P_378_0[i] = new qx.ui.core.ColumnData();
      }
    },
    members: {
      __P_378_0: null,

      /**
       * Get the array of column data.
       *
       * @return {Array}
       *   Array of column data
       *
       */
      getData: function getData() {
        return this.__P_378_0;
      },

      /**
       * Set the width, minimum width and/or maximum width of a column at one
       * time.
       *
       * @param column {Integer}
       *   The column number whose attributes are being set.
       *
       * @param map {Map}
       *   An object with any or all of the three members, "width", "minWidth",
       *   "maxWidth".  The property values are as described for {@link
       *   #setWidth}, {@link #setMinWidth} and {@link #setMaxWidth}
       *   respectively.
       *
       */
      set: function set(column, map) {
        for (var key in map) {
          switch (key) {
            case "width":
              this.setWidth(column, map[key]);
              break;

            case "minWidth":
              this.setMinWidth(column, map[key]);
              break;

            case "maxWidth":
              this.setMaxWidth(column, map[key]);
              break;

            default:
              throw new Error("Unrecognized key: " + key);
          }
        }
      },

      /**
       * Set the width of a column.
       *
       *
       * @param column {Integer} The column whose width is to be set
       *
       * @param width {Integer|String}
       *   The width of the specified column.  The width may be specified as
       *   integer number of pixels (e.g. 100), a string representing percentage
       *   of the inner width of the Table (e.g. "25%"), or a string
       *   representing a flex width (e.g. "1*").
       *
       *
       * @throws {Error}
       *   Error is thrown if the provided column number is out of the range.
       */
      setWidth: function setWidth(column, width) {
        if (column > this.__P_378_0.length - 1 || column < 0) {
          throw new Error("Column number out of range");
        }

        this.__P_378_0[column].setColumnWidth(width);
      },

      /**
       * Set the minimum width of a column.
       *
       *
       * @param column {Integer}
       *   The column whose minimum width is to be set
       *
       * @param width {Integer}
       *   The minimum width of the specified column.
       *
       *
       * @throws {Error}
       *   Error is thrown if the provided column number is out of the range.
       */
      setMinWidth: function setMinWidth(column, width) {
        if (column > this.__P_378_0.length - 1 || column < 0) {
          throw new Error("Column number out of range");
        }

        this.__P_378_0[column].setMinWidth(width);
      },

      /**
       * Set the maximum width of a column.
       *
       *
       * @param column {Integer}
       *   The column whose maximum width is to be set
       *
       * @param width {Integer}
       *   The maximum width of the specified column.
       *
       *
       * @throws {Error}
       *   Error is thrown if the provided column number is out of the range.
       */
      setMaxWidth: function setMaxWidth(column, width) {
        if (column > this.__P_378_0.length - 1 || column < 0) {
          throw new Error("Column number out of range");
        }

        this.__P_378_0[column].setMaxWidth(width);
      }
    }
  });
  qx.ui.progressive.renderer.table.Widths.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Widths.js.map?dt=1603737143873