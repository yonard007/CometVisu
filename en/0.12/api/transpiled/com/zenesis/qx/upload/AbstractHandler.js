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
      "qx.core.Assert": {
        "construct": true
      },
      "qx.lang.Type": {},
      "qx.log.Logger": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ***********************************************************************
  
     UploadMgr - provides an API for uploading one or multiple files
     with progress feedback (on modern browsers), does not block the user 
     interface during uploads, supports cancelling uploads.
  
     http://qooxdoo.org
  
     Copyright:
       2011 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       
       This software is provided under the same licensing terms as Qooxdoo,
       please see the LICENSE file in the Qooxdoo project's top-level directory 
       for details.
  
     Authors:
   * John Spackman (john.spackman@zenesis.com)
  
   ************************************************************************/

  /**
   * Base class for upload implementations; operates a queue of pending and
   * current uploads, and restricts the number of simultaneous uploads.
   */
  qx.Class.define("com.zenesis.qx.upload.AbstractHandler", {
    type: "abstract",
    extend: qx.core.Object,

    /**
     * Constructor
     * 
     * @param uploader
     *          {com.zenesis.qx.upload.UploadMgr} controller for uploading
     */
    construct: function construct(uploader) {
      qx.core.Object.constructor.call(this);
      qx.core.Assert.assertNotNull(uploader);
      this.__P_525_0 = [];
      this.__P_525_1 = [];
      this.__P_525_2 = {};
      this.__P_525_3 = uploader;
    },
    properties: {
      /**
       * Maximum number of simultaneous uploads
       */
      maxConnections: {
        check: "Integer",
        init: 5,
        nullable: false,
        event: "changeMaxConnections"
      }
    },
    members: {
      // Last unique ID used
      __P_525_4: 0,
      // Uploader instance
      __P_525_3: null,
      // Queue of com.zenesis.qx.upload.File's to send
      __P_525_0: null,
      // List of com.zenesis.qx.upload.File's currently being sent
      __P_525_1: null,
      // Parameters to post with the file
      __P_525_2: null,

      /**
       * Adds a file to the upload queue; this does not start uploading until
       * beginUploads is called.
       * 
       * @param input
       *          {DOM} either one input[type=file] or an array of
       *          input[type=file]
       * @param widget
       *          {Widget} the widget that trigger the upload
       */
      addFile: function addFile(input, widget) {
        var files = this._createFile(input);

        if (!qx.lang.Type.isArray(files)) {
          files.setUploadWidget(widget);

          this._addFile(files);
        } else for (var i = 0; i < files.length; i++) {
          files[i].setUploadWidget(widget);

          this._addFile(files[i]);
        }
      },

      /**
       * Adds a blob to the upload list 
       * 
       * @param filename    {String}  name of object
       * @param blob        {Blob}    the blob to upload
       * @param params      {Object}  List of params added to the upload params
       */
      addBlob: function addBlob(filename, blob, params) {
        /* abstract */
      },

      /**
       * Adds a file to the outbound queue
       * 
       * @param file
       *          {com.zenesis.qx.upload.File} the file to add
       */
      _addFile: function _addFile(file) {
        if (this.__P_525_3.fireDataEvent("addFile", file, null, true)) this.__P_525_0.push(file);
      },

      /**
       * Begins spooling uploads to the server, up to the maxConnections
       */
      beginUploads: function beginUploads() {
        while (this.__P_525_0.length > 0 && this.__P_525_1.length < this.getMaxConnections()) {
          var file = this.__P_525_0.shift();

          this.__P_525_1.push(file);

          this.__P_525_3.fireDataEvent("beginUpload", file);

          file.setState("uploading");

          this._doUpload(file);
        }
      },

      /**
       * Cancels a file
       * 
       * @param file
       *          {com.zenesis.qx.upload.File} the file to cancel
       */
      cancel: function cancel(file) {
        var wasUploading = this.__P_525_1.length > 0; // this.debug("cancelled: id=" + file.getId() + ", fileName=" +
        // file.getFilename());

        this._cancel(file);

        if (wasUploading && this.__P_525_3.getAutoUpload()) this.beginUploads();
      },

      /**
       * Cancels all uploads
       */
      cancelAll: function cancelAll() {
        for (var current = this.__P_525_1, i = 0; i < current.length; i++) {
          this._cancel(current[i]);
        }

        this.__P_525_1.splice(0, this.__P_525_1.length);

        this.__P_525_0.splice(0, this.__P_525_0.length);
      },

      /**
       * Cancels a file
       * 
       * @param file
       *          {com.zenesis.qx.upload.File} the file to cancel
       */
      _cancel: function _cancel(file) {
        var inCurrent = false;

        for (var current = this.__P_525_1, i = 0; i < current.length; i++) {
          if (current[i] == file) {
            current.splice(i, 1);
            inCurrent = true;
            break;
          }
        }

        for (var queue = this.__P_525_0, i = 0; i < queue.length; i++) {
          if (queue[i] == file) {
            queue.splice(i, 1);
            break;
          }
        }

        file.setState("cancelled");
        if (inCurrent) this._doCancel(file);

        this.__P_525_3.fireDataEvent("cancelUpload", file);
      },

      /**
       * Called by derived classes when a file has completed
       * 
       * @param file
       *          {com.zenesis.qx.upload.File} the file which has finsihed
       *          uploading
       * @param response
       *          {String} text received
       */
      _onCompleted: function _onCompleted(file, response) {
        // this.debug("completed: id=" + file.getId() + ", fileName=" +
        // file.getFilename() + ", response=" + response);
        var current = this.__P_525_1;

        for (var i = 0; i < current.length; i++) {
          if (current[i] == file) {
            current.splice(i, 1);
            break;
          }
        }

        file.setResponse(response); // File state should be uploading or cancelled

        if (file.getState() == "uploading") {
          file.setState("uploaded");

          this.__P_525_3.fireDataEvent("completeUpload", file);
        } // Start the next one


        this.beginUploads();
      },

      /**
       * Returns the uploader
       * 
       * @returns {com.zenesis.qx.upload.UploadMgr}
       */
      _getUploader: function _getUploader() {
        return this.__P_525_3;
      },

      /**
       * Allocates a unique ID
       * 
       * @returns {Number}
       */
      _getUniqueFileId: function _getUniqueFileId() {
        return ++this.__P_525_4;
      },

      /**
       * Adds a parameter to send to the client
       * 
       * @param key
       *          {String} the name of the parameter
       * @param value
       *          {String} the value of the parameter
       * @deprecated {1.0} see com.zenesis.qx.upload.UploadMgr.setParam or
       *             com.zenesis.qx.upload.File.setParam
       */
      addParam: function addParam(key, value) {
        qx.log.Logger.deprecatedMethodWarning(arguments.callee, "see com.zenesis.qx.upload.UploadMgr.setParam or com.zenesis.qx.upload.File.setParam");
        this.__P_525_2[key] = value;
      },

      /**
       * Returns the paramaters map
       * 
       * @returns {Map}
       * @deprecated {1.0} see com.zenesis.qx.upload.File.getParam
       */
      getParams: function getParams() {
        qx.log.Logger.deprecatedMethodWarning(arguments.callee, "see com.zenesis.qx.upload.UploadMgr.getParam or com.zenesis.qx.upload.File.getParam");
        return this.__P_525_2;
      },

      /**
       * Helper method that produces a final list of parameter values, by merging
       * those set in this with those in the file.
       * 
       * @param file
       *          {File} the file object
       * @returns {Map} map of parameters to sent to the server
       */
      _getMergedParams: function _getMergedParams(file) {
        var result = {};

        for (var name in this.__P_525_2) {
          var value = this.__P_525_2[name];
          if (value !== null) result[name] = value;
        }

        function merge(obj) {
          var names = obj.getParamNames();

          for (var i = 0; i < names.length; i++) {
            var name = names[i],
                value = obj.getParam(name);
            if (value !== null) result[name] = value;else delete result[name];
          }
        }

        merge(this.__P_525_3);
        var widget = file.getUploadWidget();
        if (widget && typeof widget.getParamNames == "function") merge(widget);
        if (typeof file.getParamNames == "function") merge(file);
        return result;
      },

      /**
       * Implementation must create a com.zenesis.qx.upload.File or array of
       * com.zenesis.qx.upload.File
       * 
       * @param input
       *          {DOM} the DOM input[type=file]
       * @return {com.zenesis.qx.upload.File|com.zenesis.qx.upload.File[]}
       */
      _createFile: function _createFile(input) {
        /* abstract */
      },

      /**
       * Called to do the real work of uploading the file
       * 
       * @param file
       *          {com.zenesis.qx.upload.File}
       */
      _doUpload: function _doUpload(file) {
        /* abstract */
      },

      /**
       * Called to cancel the upload
       * 
       * @param file
       *          {com.zenesis.qx.upload.File} file to cancel uploading
       */
      _doCancel: function _doCancel(file) {
        /* abstract */
      }
    }
  });
  com.zenesis.qx.upload.AbstractHandler.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractHandler.js.map?dt=1592777116322