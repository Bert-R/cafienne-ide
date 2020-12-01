class CaseTeamDefinition extends UnnamedCMMNElementDefinition {
    constructor(importNode, caseDefinition, parent) {
        super(importNode, caseDefinition, parent);
        /** @type {Array<CaseRoleDefinition>} */
        this.roles = this.parseElements('role', CaseRoleDefinition);
        if (this.roles.length == 0 && this.name) {
            // This means we bumped into a CMMN 1.0 role
            console.log('Converting CMMN1.0 role');
            // Since this is single role, the (optional) description is already converted to documentation, but remove that
            //  and let the role conversion create it instead
            if (this.documentation.text) this.documentation.text = '';
            this.importNode.appendChild(CaseTeamDefinition.convertRoleDefinition(importNode));
            this.roles = this.parseElements('role', CaseRoleDefinition);
            this.caseDefinition.migrated = true;
        }
    }

    /**
     * 
     * @param {Element} element 
     */
    static convertRoleDefinition(element) {
        const clearAttribute = name => {
            const value = element.getAttribute(name) || ''; // Avoid reading null values from attributes
            element.removeAttribute(name); // And clear the attribute
            return value;
        }

        const id = clearAttribute('id');
        const name = clearAttribute('name');
        const description = clearAttribute('description');
        const optionalDescription = name !== description ? `description="${description}"` : ''; 
        return XML.parseXML(`<role id="${id}" name="${name}" ${optionalDescription}/>`).documentElement;
    }

    createExportNode(parentNode) {
        // Only export if there are actual roles defined in this case
        if (this.roles.length) {
            super.createExportNode(parentNode, 'caseRoles', 'roles');
        }
    }
}