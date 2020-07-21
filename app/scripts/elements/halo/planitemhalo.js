import {Halo} from "./halo";
import {ConnectorHaloItem} from "./item/halodragitems";
import {PropertiesHaloItem} from "./item/haloclickitems";
import {DeleteHaloItem} from "./item/haloclickitems";
import {EntryCriterionHaloItem} from "./item/halodragitems";
import {ExitCriterionHaloItem} from "./item/halodragitems";

export class PlanItemHalo extends Halo {
    /**
     * Create the halo for the plan item.
     * @param {PlanItemView} element
     */
    constructor(element) {
        super(element);
        this.element = element;
    }

    /**
     * sets the halo images in the resizer
     */
    createItems() {
        this.addItems(ConnectorHaloItem, PropertiesHaloItem, DeleteHaloItem);
        if (!this.element.definition.isDiscretionary) {
            this.addItems(EntryCriterionHaloItem, ExitCriterionHaloItem);
        }
    }
}
