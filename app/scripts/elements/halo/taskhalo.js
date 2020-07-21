import {PlanItemHalo} from "./planitemhalo";
import {ZoomTaskImplementationHaloItem} from "./item/haloclickitems";
import {InputParametersHaloItem} from "./item/haloclickitems";
import {OutputParametersHaloItem} from "./item/haloclickitems";
import {NewTaskImplemenationHaloItem} from "./item/haloclickitems";

export class TaskHalo extends PlanItemHalo {
    /**
     * Create the halo for the task.
     * @param {Task} element
     */
    constructor(element) {
        super(element);
        this.element = element;
    }

    createItems() {
        super.createItems();
        if (this.element.planItemDefinition.implementationRef) {
            this.addItems(ZoomTaskImplementationHaloItem, InputParametersHaloItem, OutputParametersHaloItem);
        } else {
            this.addItems(NewTaskImplemenationHaloItem);
        }
    }
}
