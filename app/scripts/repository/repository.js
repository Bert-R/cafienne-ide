exports.Repository = class Repository {
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

}
