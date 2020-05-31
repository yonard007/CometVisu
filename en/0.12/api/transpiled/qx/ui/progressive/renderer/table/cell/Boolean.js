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
      "qx.ui.progressive.renderer.table.cell.Icon": {
        "construct": true,
        "require": true
      },
      "qx.theme.manager.Meta": {
        "construct": true
      },
      "qx.util.AliasManager": {},
      "qx.util.ResourceManager": {},
      "qx.bom.client.Css": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.alphaimageloaderneeded": {
          "className": "qx.bom.client.Css"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
       2008 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
       * Carsten Lergenmueller (carstenl)
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * Table Cell Boolean Renderer.
   */
  qx.Class.define("qx.ui.progressive.renderer.table.cell.Boolean", {
    extend: qx.ui.progressive.renderer.table.cell.Icon,
    construct: function construct() {
      qx.ui.progressive.renderer.table.cell.Icon.constructor.call(this);

      this.__resolveImages(); // dynamic theme switch


      {
        qx.theme.manager.Meta.getInstance().addListener("changeTheme", this.__resolveImages, this);
      }
    },
    properties: {
      /**
       * Whether to add code which will toggle the checkbox on/off.  (There is
       * not yet code here to generate an event when this occurs, so it's not
       * yet very useful.)
       */
      allowToggle: {
        check: "Boolean",
        init: false
      }
    },
    members: {
      __iconUrlTrue: null,
      __iconUrlFalse: null,
      __numericAllowed: null,
      __conditions: null,
      __defaultTextAlign: null,
      __defaultColor: null,
      __defaultFontStyle: null,
      __defaultFontWeight: null,

      /**
       * Resolve the boolean images using the alias and resource manager.
       */
      __resolveImages: function __resolveImages() {
        var aliasManager = qx.util.AliasManager.getInstance();
        var resourceManager = qx.util.ResourceManager.getInstance();
        var boolTrueImg = aliasManager.resolve("decoration/table/boolean-true.png");
        var boolFalseImg = aliasManager.resolve("decoration/table/boolean-false.png");
        this.__iconUrlTrue = resourceManager.toUri(boolTrueImg);
        this.__iconUrlFalse = resourceManager.toUri(boolFalseImg);
      },
      // overridden
      _identifyImage: function _identifyImage(cellInfo) {
        var imageData = {
          imageWidth: 11,
          imageHeight: 11
        };

        switch (cellInfo.cellData) {
          case true:
            imageData.url = this.__iconUrlTrue;
            imageData.extras = "celldata='1' ";
            break;

          case false:
            imageData.url = this.__iconUrlFalse;
            imageData.extras = "celldata='0' ";
            break;

          default:
            imageData.url = null;
            break;
        }

        if (this.getAllowToggle()) {
          // Toggle the boolean value if clicked
          imageData.extras += "onclick=\"var node = this.attributes.getNamedItem('celldata'); var value = node.nodeValue; var src; if (value == '0') {";

          if (qx.core.Environment.get("css.alphaimageloaderneeded") && /\.png$/i.test(this.__iconUrlTrue)) {
            imageData.extras += "  this.src='" + this.getBlankImage() + "'; " + "  var loader = 'DXImageTransform.Microsoft.AlphaImageLoader'; " + "  var filters = this.filters.item(loader); " + "  filters.src='" + this.__iconUrlTrue + "'; " + "  filters.sizingMethod = 'scale'; ";
          } else {
            imageData.extras += "  this.src='" + this.__iconUrlTrue + "'; ";
          }

          imageData.extras += "  node.nodeValue='1'; } else {";

          if (qx.core.Environment.get("css.alphaimageloaderneeded") && /\.png$/i.test(this.__iconUrlFalse)) {
            imageData.extras += "  this.src='" + this.getBlankImage() + "'; " + "  var loader = 'DXImageTransform.Microsoft.AlphaImageLoader'; " + "  var filters = this.filters.item(loader); " + "  filters.src='" + this.__iconUrlFalse + "'; " + "  filters.sizingMethod = 'scale'; ";
          } else {
            imageData.extras += "  this.src='" + this.__iconUrlFalse + "'; ";
          }

          imageData.extras += "  node.nodeValue='0'; }";
          imageData.extras += // IE doesn't allow setNamedItem() if not explicitly an "attribute"
          "try {   this.attributes.setNamedItem(node); } catch (e) {   var namedItem = document.createAttribute('celldata');   namedItem.value = node.nodeValue;   this.attributes.setNamedItem(namedItem); }\"";
        }

        return imageData;
      },
      // overridden
      _getCellStyle: function _getCellStyle(cellInfo) {
        var ret = qx.ui.progressive.renderer.table.cell.Boolean.prototype._getCellStyle.base.call(this, cellInfo);

        return ret;
      }
    },
    destruct: function destruct() {
      this.__iconUrlTrue = this.__iconUrlFalse = null; // remove dynamic theme listener

      {
        qx.theme.manager.Meta.getInstance().removeListener("changeTheme", this.__resolveImages, this);
      }
    }
  });
  qx.ui.progressive.renderer.table.cell.Boolean.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Boolean.js.map?dt=1590928203552