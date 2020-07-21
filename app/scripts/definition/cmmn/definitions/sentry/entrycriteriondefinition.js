import {CriterionDefinition} from "./criteriondefinition";

export class EntryCriterionDefinition extends CriterionDefinition {
    /**
     * @param {Element} parentNode
     */
    createExportNode(parentNode) {
        super.createExportNode(parentNode, 'entryCriterion');
    }
}
