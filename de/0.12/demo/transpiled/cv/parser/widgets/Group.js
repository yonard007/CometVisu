(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.parser.WidgetParser": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Group.js 
   * 
   * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
   * 
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

  /**
   * Parse group config elements
   */
  qx.Class.define('cv.parser.widgets.Group', {
    type: "static",

    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      /**
       * Parses the widgets XML configuration and extracts the given information
       * to a simple key/value map.
       *
       * @param xml {Element} XML-Element
       * @param path {String} internal path of the widget
       * @param flavour {String} Flavour of the widget
       * @param pageType {String} Page type (2d, 3d, ...)
       */
      parse: function parse(xml, path, flavour, pageType) {
        var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());

        if (data.target) {
          data.classes += ' clickable';
          data.bindClickToWidget = true; // for groups with pagejumps this is mandatory
        }

        if (data.noWidget === true) {
          data.classes = data.classes.replace("widget ", "");
        }

        cv.parser.WidgetParser.parseChildren(xml, path, flavour, pageType);
        return data;
      },
      getAttributeToPropertyMappings: function getAttributeToPropertyMappings() {
        return {
          'nowidget': {
            target: 'noWidget',
            "default": false,
            transform: function transform(value) {
              return value === "true";
            }
          },
          'name': {
            "default": ""
          },
          'target': {
            "default": ""
          }
        };
      }
    },
    defer: function defer(statics) {
      cv.parser.WidgetParser.addHandler("group", statics);
    }
  });
  cv.parser.widgets.Group.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Group.js.map?dt=1589401086821