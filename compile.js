const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')

qx.Class.define("cv.compile.LibraryApi", {
  extend: qx.tool.cli.api.LibraryApi,

  members: {
    /**
     * Called to load any library-specific configuration and update the compilerConfig
     */
    async load () {
      const config = this.getCompilerApi().getConfiguration()
      this.readEnv(config)

      let command = this.getCompilerApi().getCommand();
      command.addListener("made", () => this._onMade());
    },

    /**
     * Called after all libraries have been loaded and added to the compilation data
     */
    _onMade() {
      const config = this.getCompilerApi().getConfiguration()
      this.copyFiles(config)
    },

    readEnv (config) {
      const checkEnvs = {
        CV_VERSION: 'cv.version',
        CV_TESTMODE: "cv.testMode"
      }

      // transfer environment variables
      Object.keys(checkEnvs).forEach((name) => {
        if (process.env[name]) {
          config.environment[checkEnvs[name]] = process.env[name]
        }
      })
    },

    copyFiles (config) {
      const filesToCopy = [
        "resource/sentry/bundle.min.js",
        "editor",
        "upgrade",
        "check_config.php",
        "manager.php",
        "version",
        "library_version.inc.php",
        "../node_modules/monaco-editor"
      ]
      const currentDir = process.cwd()
      let targetDir = ""
      config.targets.some(target => {
        if (target.type === config.targetType) {
          targetDir = target.outputPath
        }
      })
      if (targetDir) {
        filesToCopy.forEach(file => {
          const source = path.join(currentDir, 'source', file)
          const target = path.join(currentDir, targetDir, (file.startsWith('../') ? file.substring(3) : file))
          const stats = fs.statSync(source);
          const dirname = stats.isDirectory()? target : path.dirname(target)
          fse.ensureDirSync(dirname)
          fse.copySync(source, target)
        })
      }
    }
  }
});

module.exports = {
  LibraryApi: cv.compile.LibraryApi
};
