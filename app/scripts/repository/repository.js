import {ServerFile} from "./serverfile";

export class Repository {
    /**
     * This object handles the interaction with the backend to load and save the various types of models.
     * It keeps a local copy of all models present in the server. This local copy is updated after each
     * save operation, since the save operation returns a list of all files in the server, along with
     * their last modified status.
     * @param {IDE} ide
     */
    constructor(ide) {
        this.ide = ide;
        /** @type {Array<ServerFile>} */
        this.list = [];
        /** @type {Array<Function>} */
        this.listeners = [];
    }

    listModels(callback = undefined) {
      $.ajax({
        url: '/repository/list',
        type: 'get',
        success: (data, status, xhr) => {
          this.updateFileList(data);
          // Callback if there is a callback.
          if (callback) callback();
        },
        error: (xhr, error, eThrown) => {
          console.error('Could not list the repository contents', eThrown)
          this.ide.danger('Could not fetch the list of models');
        }
    });
  }

  updateFileList(newServerFileList) {
      // Make a copy of the old list, to be able to clean up old models afterwards;
      const oldList = this.list;
      // Map the new server list into a list of structured objects. Also re-use existing objects as much as possible.
      /** @type {Array<ServerFile>} */
      this.list = newServerFileList.map(fileMetadata => {
          const fileName = fileMetadata.filename;
          const existingServerFile = this.list.find(file => file.fileName == fileName);
          if (!existingServerFile) {
              return new ServerFile(this, fileName, fileMetadata);
          } else {
              Util.removeFromArray(this.list, existingServerFile);
              existingServerFile.refreshMetadata(fileMetadata);
              return existingServerFile;
          }
      });
      // Inform elements still in old list about their deletion.
      oldList.forEach(serverFile => serverFile.deprecate());
      // Now invoke any repository listeners about the new list.
      this.listeners.forEach(listener => listener());
  }

}
