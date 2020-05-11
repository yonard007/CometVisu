(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* IPage.js 
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
   * IPage
   *
   * @author tobiasb
   * @since 2017
   */

  /**
   * Interface that all structure page widgets must implement
   */
  qx.Interface.define("cv.ui.structure.IPage", {
    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      /**
       * The internal path to the widget
       * @type {String}
       */
      path: {},

      /**
       * The page type (text, 2d, 3d)
       * @type {String}
       */
      pageType: {},
      backdropAlign: {},
      backdropType: {}
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      /**
       * Return the widgets DOM element
       * @return {Element}
       */
      getDomElement: function getDomElement() {}
    }
  });
  cv.ui.structure.IPage.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IPage.js.map?dt=1589223277346