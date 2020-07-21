import {CMMNElementDefinition} from "./cmmnelementdefinition";

/**
 * Simple helper class to support specific extensions to CMMN
 */
export class UnnamedCMMNElementDefinition extends CMMNElementDefinition {
    isNamedElement() {
        return false;
    }

    createExportNode(parentNode, tagName, ...propertyNames) {
        super.createExportNode(parentNode, tagName, propertyNames);
    }
}
