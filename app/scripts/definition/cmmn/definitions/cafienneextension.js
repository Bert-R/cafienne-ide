import {UnnamedCMMNElementDefinition} from "./unnamedcmmnelementdefinition";
import {IMPLEMENTATION_TAG} from "../../../elements/elements";
/**
 * Simple helper class to support specific extensions to CMMN
 */
export class CafienneExtension extends UnnamedCMMNElementDefinition {
    constructor(element, caseDefinition, parent) {
        super(element, caseDefinition, parent);
    }
}
CafienneExtension.TAG = IMPLEMENTATION_TAG;
