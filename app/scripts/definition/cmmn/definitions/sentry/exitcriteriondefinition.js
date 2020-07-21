import {CriterionDefinition} from "./criteriondefinition";

export class ExitCriterionDefinition extends CriterionDefinition {
    /**
     * @param {Element} parentNode
     */
    createExportNode(parentNode) {
        super.createExportNode(parentNode, 'exitCriterion');
    }
}
