(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.progressive.renderer.table.cell.Abstract": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2008 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * Table Cell Html Renderer.
   *
   *  Renderer the specified HTML in the cell.
   */
  qx.Class.define("qx.ui.progressive.renderer.table.cell.Html", {
    /*
     * Nothing specific to do here, as the Abstract class already does
     * everything we need.
     */
    extend: qx.ui.progressive.renderer.table.cell.Abstract
  });
  qx.ui.progressive.renderer.table.cell.Html.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Html.js.map?dt=1589123577388