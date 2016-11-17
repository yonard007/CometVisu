qx.Class.define('cv.Config', {
  type:"static",

  statics: {
    libraryVersion: 7,
    libraryCheck: true,
    // threshold where the mobile.css is loaded
    maxMobileScreenWidth: 480,
    // threshold where different colspans are used
    maxScreenWidthColspanS: 599,
    maxScreenWidthColspanM: 839,
    scrollSpeed : 0,

    defaultColumns : 12,
    minColumnWidth : 120,

    enableAddressQueue : false,

    backend : 'default',
    backendUrl : null,
    configSuffix : null,
    clientDesign : "",
    forceReload : false,
    use_maturity : false
  },

  defer: function() {
    if ($.getUrlVar('enableQueue')) {
      cv.Config.enableAddressQueue = true;
    }

    if ($.getUrlVar('libraryCheck')) {
      cv.Config.libraryCheck = $.getUrlVar('libraryCheck') != 'false'; // true unless set to false
    }
    if ($.getUrlVar("backend")) {
      cv.Config.backend = $.getUrlVar("backend");
    }

    if ($.getUrlVar("config")) {
      cv.Config.configSuffix = $.getUrlVar("config");
    }

    if ($.getUrlVar('forceReload')) {
      cv.Config.forceReload = $.getUrlVar('forceReload') != 'false'; // true unless set
      // to false
    }

    // "Bug"-Fix for ID: 3204682 "Caching on web server"
    // Config isn't a real fix for the problem as that's part of the web browser,
    // but
    // it helps to avoid the problems on the client, e.g. when the config file
    // has changed but the browser doesn't even ask the server about it...
    cv.Config.forceReload = true;

    if ($.getUrlVar('forceDevice')) {
      cv.Config.forceMobile = $.getUrlVar('forceDevice') == 'mobile';
      cv.Config.forceNonMobile = !cv.Config.forceMobile;
    } else {
      cv.Config.forceMobile = false;
      cv.Config.forceNonMobile = false;
    }
    var uagent = navigator.userAgent.toLowerCase();
    cv.Config.mobileDevice = (/(android|blackberry|iphone|ipod|series60|symbian|windows ce|palm)/i.test(uagent));
    if (/(nexus 7|tablet)/i.test(uagent)) cv.Config.mobileDevice = false;  // Nexus 7 and Android Tablets have a "big" screen, so prevent Navbar from scrolling
    cv.Config.mobileDevice |= cv.Config.forceMobile;  // overwrite detection when set by URL


    // Disable features that aren't ready yet
    // Config can be overwritten in the URL with the parameter "maturity"

    if ($.getUrlVar('maturity')) {
      cv.Config.url_maturity = $.getUrlVar('maturity');
      if (!isNaN(Config.url_maturity - 0)) {
        cv.Config.use_maturity = cv.Config.url_maturity - 0; // given directly as number
      } else {
        cv.Config.use_maturity = Maturity[cv.Config.url_maturity]; // or as the ENUM name
      }
    }

    if (isNaN(Config.use_maturity)) {
      Config.use_maturity = cv.structure.pure.AbstractWidget.my.Maturity.release; // default to release
    }
  }
});