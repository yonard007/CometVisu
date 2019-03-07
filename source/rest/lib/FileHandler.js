const fs = require('fs')
const path = require('path')
const config = require('../config')
const AbstractHandler = require('./AbstractHandler')

class FileHandler extends AbstractHandler {
  constructor() {
    super()
    this.trashFolder = config.trashFolderName
    this.useTrash = true;
  }

  sendFile(context, file) {
    if (file === null) {
      this.respondMessage(context,404, 'File not found')
    } else {
      context.res
        .setStatus(200)
        .set('content-type', 'text/xml')
        .setBody(fs.readFileSync(file));
    }
  }

  /**
   * Create a new file
   * @param context {Context}
   * @param file {String} path to file
   * @param content
   */
  createFile(context, file, content) {
    if (fs.existsSync(file)) {
      this.respondMessage(context,406, 'File already exists')
    } else {
      try {
        fs.writeFileSync(file, content)
        this.ok(context)
      } catch (err) {
        console.error(err)
        this.respondMessage(context,405, err.toString())
      }
    }
  }

  /**
   * Update the content of an existing file
   * @param context {Context}
   * @param file {String} absolute path to file
   * @param content {String} file context
   */
  updateFile(context, file, content) {
    if (!fs.existsSync(file)) {
      this.respondMessage(context,404, 'File not found')
    } else {
      try {
        const dirname = path.dirname(file)
        if (!fs.existsSync(dirname)) {
          // create missing dirs first
          fs.mkdirSync(dirname, {recursive: true})
        }
        fs.writeFileSync(file, content)
        this.ok(context)
      } catch (err) {
        console.error(err)
        this.respondMessage(context,405, err.toString())
      }
    }
  }

  /**
   * Delete a file from filesystem by either moving it to the trash folder or deleting it directly.
   * @param context {Context}
   * @param file {String} absolute path to file that should be deleted
   * @param force {Boolean} if true delete directly, no mosing to trash
   */
  deleteFile(context, file, force) {
    if (!fs.existsSync(file)) {
      // nothing to do
      return this.ok(context)
    }
    try {
      if (this.useTrash === true) {
        const dirname = path.dirname(file)
        const filename = path.basename(file)
        const absTrashFolder = path.join(dirname, this.trashFolder)
        if (!fs.existsSync(absTrashFolder)) {
          fs.mkdirSync(absTrashFolder)
        }
        const baseTrashFile = path.join(absTrashFolder, filename)
        let trashFile = baseTrashFile
        let index = 1
        while (fs.existsSync(trashFile)) {
          trashFile = baseTrashFile + '.' + index++
        }
        fs.rename(file, trashFile)
      } else {
        fs.unlinkSync(file)
      }
      this.ok(context)
    } catch (err) {
      console.error(err)
      this.respondMessage(context,405, err.toString())
    }
  }


}

module.exports = FileHandler