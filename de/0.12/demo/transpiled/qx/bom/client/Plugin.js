function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Engine": {},
      "qx.bom.client.Browser": {},
      "qx.core.Environment": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": ["plugin.gears", "plugin.quicktime", "plugin.quicktime.version", "plugin.windowsmedia", "plugin.windowsmedia.version", "plugin.divx", "plugin.divx.version", "plugin.silverlight", "plugin.silverlight.version", "plugin.pdf", "plugin.pdf.version", "plugin.activex", "plugin.skype"],
      "required": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Contains detection for QuickTime, Windows Media, DivX, Silverlight and gears.
   * If no version could be detected the version is set to an empty string as
   * default.
   *
   * This class is used by {@link qx.core.Environment} and should not be used
   * directly. Please check its class comment for details how to use it.
   *
   * @internal
   */
  qx.Bootstrap.define("qx.bom.client.Plugin", {
    statics: {
      /**
       * Checks for the availability of google gears plugin.
       *
       * @internal
       * @return {Boolean} <code>true</code> if gears is available
       */
      getGears: function getGears() {
        return !!(window.google && window.google.gears);
      },

      /**
       * Checks for ActiveX availability.
       *
       * @internal
       * @return {Boolean} <code>true</code> if ActiveX is available
       *
       * @ignore(window.ActiveXObject)
       */
      getActiveX: function getActiveX() {
        if (typeof window.ActiveXObject === "function") {
          return true;
        }

        try {
          // in IE11 Preview, ActiveXObject is undefined but instances can
          // still be created
          return window.ActiveXObject !== undefined && (_typeof(new window.ActiveXObject("Microsoft.XMLHTTP")) === "object" || _typeof(new window.ActiveXObject("MSXML2.DOMDocument.6.0")) === "object");
        } catch (ex) {
          return false;
        }
      },

      /**
       * Checks for Skypes 'Click to call' availability.
       *
       * @internal
       * @return {Boolean} <code>true</code> if the plugin is available.
       */
      getSkype: function getSkype() {
        // IE Support
        if (qx.bom.client.Plugin.getActiveX()) {
          try {
            new window.ActiveXObject("Skype.Detection");
            return true;
          } catch (e) {}
        }

        var mimeTypes = navigator.mimeTypes;

        if (mimeTypes) {
          // FF support
          if ("application/x-skype" in mimeTypes) {
            return true;
          } // webkit support


          for (var i = 0; i < mimeTypes.length; i++) {
            var desc = mimeTypes[i];

            if (desc.type.indexOf("skype.click2call") != -1) {
              return true;
            }
          }

          ;
        }

        return false;
      },

      /**
       * Database of supported features.
       * Filled with additional data at initialization
       */
      __P_239_0: {
        quicktime: {
          plugin: ["QuickTime"],
          control: "QuickTimeCheckObject.QuickTimeCheck.1" // call returns boolean: instance.IsQuickTimeAvailable(0)

        },
        wmv: {
          plugin: ["Windows Media"],
          control: "WMPlayer.OCX.7" // version string in: instance.versionInfo

        },
        divx: {
          plugin: ["DivX Web Player"],
          control: "npdivx.DivXBrowserPlugin.1"
        },
        silverlight: {
          plugin: ["Silverlight"],
          control: "AgControl.AgControl" // version string in: instance.version (Silverlight 1.0)
          // version string in: instance.settings.version (Silverlight 1.1)
          // version check possible using instance.IsVersionSupported

        },
        pdf: {
          plugin: ["Chrome PDF Viewer", "Adobe Acrobat"],
          control: "AcroPDF.PDF" // this is detecting Acrobat PDF version > 7 and Chrome PDF Viewer

        }
      },

      /**
       * Fetches the version of the quicktime plugin.
       * @return {String} The version of the plugin, if available,
       *   an empty string otherwise
       * @internal
       */
      getQuicktimeVersion: function getQuicktimeVersion() {
        var entry = qx.bom.client.Plugin.__P_239_0["quicktime"];
        return qx.bom.client.Plugin.__P_239_1(entry.control, entry.plugin);
      },

      /**
       * Fetches the version of the windows media plugin.
       * @return {String} The version of the plugin, if available,
       *   an empty string otherwise
       * @internal
       */
      getWindowsMediaVersion: function getWindowsMediaVersion() {
        var entry = qx.bom.client.Plugin.__P_239_0["wmv"];
        return qx.bom.client.Plugin.__P_239_1(entry.control, entry.plugin, true);
      },

      /**
       * Fetches the version of the divx plugin.
       * @return {String} The version of the plugin, if available,
       *   an empty string otherwise
       * @internal
       */
      getDivXVersion: function getDivXVersion() {
        var entry = qx.bom.client.Plugin.__P_239_0["divx"];
        return qx.bom.client.Plugin.__P_239_1(entry.control, entry.plugin);
      },

      /**
       * Fetches the version of the silverlight plugin.
       * @return {String} The version of the plugin, if available,
       *   an empty string otherwise
       * @internal
       */
      getSilverlightVersion: function getSilverlightVersion() {
        var entry = qx.bom.client.Plugin.__P_239_0["silverlight"];
        return qx.bom.client.Plugin.__P_239_1(entry.control, entry.plugin);
      },

      /**
       * Fetches the version of the pdf plugin.
       *
       * There are two built-in PDF viewer shipped with browsers:
       *
       * <ul>
       *  <li>Chrome PDF Viewer</li>
       *  <li>PDF.js (Firefox)</li>
       * </ul>
       *
       * While the Chrome PDF Viewer is implemented as plugin and therefore
       * detected by this method PDF.js is <strong>not</strong>.
       *
       * See the dedicated environment key (<em>plugin.pdfjs</em>) instead,
       * which you might check additionally.
       *
       * @return {String} The version of the plugin, if available,
       *  an empty string otherwise
       * @internal
       */
      getPdfVersion: function getPdfVersion() {
        var entry = qx.bom.client.Plugin.__P_239_0["pdf"];
        return qx.bom.client.Plugin.__P_239_1(entry.control, entry.plugin);
      },

      /**
       * Checks if the quicktime plugin is available.
       * @return {Boolean} <code>true</code> if the plugin is available
       * @internal
       */
      getQuicktime: function getQuicktime() {
        var entry = qx.bom.client.Plugin.__P_239_0["quicktime"];
        return qx.bom.client.Plugin.__P_239_2(entry.control, entry.plugin);
      },

      /**
       * Checks if the windows media plugin is available.
       * @return {Boolean} <code>true</code> if the plugin is available
       * @internal
       */
      getWindowsMedia: function getWindowsMedia() {
        var entry = qx.bom.client.Plugin.__P_239_0["wmv"];
        return qx.bom.client.Plugin.__P_239_2(entry.control, entry.plugin, true);
      },

      /**
       * Checks if the divx plugin is available.
       * @return {Boolean} <code>true</code> if the plugin is available
       * @internal
       */
      getDivX: function getDivX() {
        var entry = qx.bom.client.Plugin.__P_239_0["divx"];
        return qx.bom.client.Plugin.__P_239_2(entry.control, entry.plugin);
      },

      /**
       * Checks if the silverlight plugin is available.
       * @return {Boolean} <code>true</code> if the plugin is available
       * @internal
       */
      getSilverlight: function getSilverlight() {
        var entry = qx.bom.client.Plugin.__P_239_0["silverlight"];
        return qx.bom.client.Plugin.__P_239_2(entry.control, entry.plugin);
      },

      /**
       * Checks if the pdf plugin is available.
       *
       * There are two built-in PDF viewer shipped with browsers:
       *
       * <ul>
       *  <li>Chrome PDF Viewer</li>
       *  <li>PDF.js (Firefox)</li>
       * </ul>
       *
       * While the Chrome PDF Viewer is implemented as plugin and therefore
       * detected by this method PDF.js is <strong>not</strong>.
       *
       * See the dedicated environment key (<em>plugin.pdfjs</em>) instead,
       * which you might check additionally.
       *
       * @return {Boolean} <code>true</code> if the plugin is available
       * @internal
       */
      getPdf: function getPdf() {
        var entry = qx.bom.client.Plugin.__P_239_0["pdf"];
        return qx.bom.client.Plugin.__P_239_2(entry.control, entry.plugin);
      },

      /**
       * Internal helper for getting the version of a given plugin.
       *
       * @param activeXName {String} The name which should be used to generate
       *   the test ActiveX Object.
       * @param pluginNames {Array} The names with which the plugins are listed in
       *   the navigator.plugins list.
       * @param forceActiveX {Boolean?false} Force detection using ActiveX
       *   for IE11 plugins that aren't listed in navigator.plugins
       * @return {String} The version of the plugin as string.
       */
      __P_239_1: function __P_239_1(activeXName, pluginNames, forceActiveX) {
        var available = qx.bom.client.Plugin.__P_239_2(activeXName, pluginNames, forceActiveX); // don't check if the plugin is not available


        if (!available) {
          return "";
        } // IE checks


        if (qx.bom.client.Engine.getName() == "mshtml" && (qx.bom.client.Browser.getDocumentMode() < 11 || forceActiveX)) {
          try {
            var obj = new window.ActiveXObject(activeXName);
            var version; // pdf version detection

            if (obj.GetVersions && obj.GetVersions()) {
              version = obj.GetVersions().split(',');

              if (version.length > 1) {
                version = version[0].split('=');

                if (version.length === 2) {
                  return version[1];
                }
              }
            }

            version = obj.versionInfo;

            if (version != undefined) {
              return version;
            }

            version = obj.version;

            if (version != undefined) {
              return version;
            }

            version = obj.settings.version;

            if (version != undefined) {
              return version;
            }
          } catch (ex) {
            return "";
          }

          return ""; // all other browsers
        } else {
          var plugins = navigator.plugins;
          var verreg = /([0-9]\.[0-9])/g;

          for (var i = 0; i < plugins.length; i++) {
            var plugin = plugins[i];

            for (var j = 0; j < pluginNames.length; j++) {
              if (plugin.name.indexOf(pluginNames[j]) !== -1) {
                if (verreg.test(plugin.name) || verreg.test(plugin.description)) {
                  return RegExp.$1;
                }
              }
            }
          }

          return "";
        }
      },

      /**
       * Internal helper for getting the availability of a given plugin.
       *
       * @param activeXName {String} The name which should be used to generate
       *   the test ActiveX Object.
       * @param pluginNames {Array} The names with which the plugins are listed in
       *   the navigator.plugins list.
       * @param forceActiveX {Boolean?false} Force detection using ActiveX
       *   for IE11 plugins that aren't listed in navigator.plugins
       * @return {Boolean} <code>true</code>, if the plugin available
       */
      __P_239_2: function __P_239_2(activeXName, pluginNames, forceActiveX) {
        // IE checks
        if (qx.bom.client.Engine.getName() == "mshtml" && (qx.bom.client.Browser.getDocumentMode() < 11 || forceActiveX)) {
          if (!this.getActiveX()) {
            return false;
          }

          try {
            new ActiveXObject(activeXName);
          } catch (ex) {
            return false;
          }

          return true; // all other
        } else {
          var plugins = navigator.plugins;

          if (!plugins) {
            return false;
          }

          var name;

          for (var i = 0; i < plugins.length; i++) {
            name = plugins[i].name;

            for (var j = 0; j < pluginNames.length; j++) {
              if (name.indexOf(pluginNames[j]) !== -1) {
                return true;
              }
            }
          }

          return false;
        }
      }
    },
    defer: function defer(statics) {
      qx.core.Environment.add("plugin.gears", statics.getGears);
      qx.core.Environment.add("plugin.quicktime", statics.getQuicktime);
      qx.core.Environment.add("plugin.quicktime.version", statics.getQuicktimeVersion);
      qx.core.Environment.add("plugin.windowsmedia", statics.getWindowsMedia);
      qx.core.Environment.add("plugin.windowsmedia.version", statics.getWindowsMediaVersion);
      qx.core.Environment.add("plugin.divx", statics.getDivX);
      qx.core.Environment.add("plugin.divx.version", statics.getDivXVersion);
      qx.core.Environment.add("plugin.silverlight", statics.getSilverlight);
      qx.core.Environment.add("plugin.silverlight.version", statics.getSilverlightVersion);
      qx.core.Environment.add("plugin.pdf", statics.getPdf);
      qx.core.Environment.add("plugin.pdf.version", statics.getPdfVersion);
      qx.core.Environment.add("plugin.activex", statics.getActiveX);
      qx.core.Environment.add("plugin.skype", statics.getSkype);
    }
  });
  qx.bom.client.Plugin.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Plugin.js.map?dt=1592778980184