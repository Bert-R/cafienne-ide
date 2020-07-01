import {Repository} from "../repository/repository";
import "jquery";
import {IDEHeader} from "./ideheader";

class IDE {
    constructor() {
    }

    init() {
        this.repository = new Repository(this);

        this.html = $('body');

        this.header = new IDEHeader(this);
        // this.main = new IDEMain(this);

        this.repository.listModels(() => {
          this.repository.list.forEach(l => {
            this.html.append("<div>" + l.name + "</div>")
          });
        });
    }

}

// For now create a global IDE pointer.
const ide = new IDE();
//Start initialization after the entire page is loaded
$(window).on('load', e => ide.init());
