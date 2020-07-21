import {Halo} from "./halo";
import {ConnectorHaloItem} from "./item/halodragitems";
import {ExitCriterionHaloItem} from "./item/halodragitems";
import {PropertiesHaloItem} from "./item/haloclickitems";
import {DeleteHaloItem} from "./item/haloclickitems";
import {EntryCriterionHaloItem} from "./item/halodragitems";

export class EntryCriterionHalo extends Halo {
    /**
     * Create the halo for the entry criterion.
     * @param {EntryCriterion} element
     */
    constructor(element) {
        super(element);
        this.element = element;
    }

    /**
     * sets the halo images in the resizer
     */
    createItems() {
        this.addItems(ConnectorHaloItem, ExitCriterionHaloItem, PropertiesHaloItem, DeleteHaloItem);
    }
}

export class ExitCriterionHalo extends Halo {
    /**
     * Create the halo for the exit criterion.
     * @param {ExitCriterion} element
     */
    constructor(element) {
        super(element);
        this.element = element;
    }

    //sets the halo images in the resizer
    createItems() {
        this.addItems(ConnectorHaloItem, EntryCriterionHaloItem, PropertiesHaloItem, DeleteHaloItem);
    }
}
