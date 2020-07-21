import {OnPartDefinition} from "./onpartdefinition";
import {CaseFileItemDef} from "../casefile/casefileitemdefinition";

export class CaseFileItemOnPartDefinition extends OnPartDefinition {
    constructor(importNode, caseDefinition, parent) {
        super(importNode, caseDefinition, parent, CaseFileItemDef);
    }

    createExportNode(parentNode) {
        super.createExportNode(parentNode, 'caseFileItemOnPart');
    }
}
