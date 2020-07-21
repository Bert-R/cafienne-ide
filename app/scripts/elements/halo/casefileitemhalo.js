import {Halo} from "./halo";
import {ConnectorHaloItem} from "./item/halodragitems";
import {PropertiesHaloItem} from "./item/haloclickitems";
import {DeleteHaloItem} from "./item/haloclickitems";
import {EntryCriterionHaloItem} from "./item/halodragitems";
import {ExitCriterionHaloItem} from "./item/halodragitems";

export class CaseFileItemHalo extends Halo {
    /**
     * Create the halo for a CaseFileItem.
     * @param {CaseFileItem} element
     */
    constructor(element) {
        super(element);
        this.element = element;
    }

    createItems() {
        this.addItems(ConnectorHaloItem, PropertiesHaloItem, DeleteHaloItem);
        if (this.element.definition.contextRef) {
            // Only show sentry options when a case file item is associated
            this.addItems(EntryCriterionHaloItem, ExitCriterionHaloItem);
        }
    }
}
