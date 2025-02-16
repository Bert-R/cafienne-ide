class ParameterMappingDefinition extends UnnamedCMMNElementDefinition {
    /**
     * 
     * @param {Element} importNode 
     * @param {CaseDefinition} caseDefinition 
     * @param {TaskDefinition} parent 
     */
    constructor(importNode, caseDefinition, parent) {
        super(importNode, caseDefinition, parent);
        this.parent = parent;
        this.sourceRef = this.parseAttribute('sourceRef');
        this.targetRef = this.parseAttribute('targetRef');
        this.transformation = this.parseElement('transformation', ExpressionDefinition);
    }

    get taskParameterName() {
        return '';
    }

    /**
     * 
     * @param {CaseFileItemDef} newBinding 
     */
    updateBindingRef(newBinding) {
        // In input mappings we try to reuse parameters. In output mappings they are unique
        if (this.isInputMapping) {
            if (this.taskParameter) {
                // If we have other mappings for this parameter, then we must create a new parameter;
                // If we do not have a bindingRef currently, then we will get a parameter based on the new binding
                if (this.parent.mappings.find(m => m != this && m.taskParameter == this.taskParameter)) {
                    // The name of the new parameter is either from the new binding or we take it from the implementation parameter.
                    const newParameterName = newBinding ? newBinding.name : this.implementationParameter.name;
                    this.taskParameter = this.parent.getInputParameterWithName(newParameterName);
                } else if (newBinding && this.taskParameter.binding != newBinding) {
                    this.taskParameter = this.parent.getInputParameterWithName(newBinding.name);
                }
            } else if (newBinding) { // We have no task parameter, let's try to find one with the CaseFileItem's name
                this.taskParameter = this.parent.getInputParameterWithName(newBinding.name);
            } else {
                // We have no task parameter, but also no new binding. Quite strange.
                // Let's just simply return to avoid script error in last line of method
                return;
            }
        } else {
            if (!this.taskParameter) {
                if (!newBinding) {
                    // Again strange situation
                    return;
                }
                this.taskParameter = this.parent.createOutputParameterWithName(newBinding.name);
            } else {
                // We have an existing parameter, now check if there is a new binding
                if (newBinding) {
                    // If we have an existing name in our parameter that starts with the newBinding's name, let's keep it, otherwise generate a new name
                    if (!this.taskParameter.name || this.taskParameter.name.indexOf(newBinding.name) != 0) {
                        this.taskParameter.name = this.parent.generateUniqueOutputParameterName(newBinding.name);
                    }
                }
            }
        }
        // On the (potentially new) task parameter we can now set the new bindingRef
        this.taskParameter.bindingRef = newBinding ? newBinding.id : undefined;
    }

    /**
     * @returns {ParameterDefinition}
     */
    get taskParameter() {
        if (this.isInputMapping) {
            return this.source;
        } else {
            return this.target;
        }
    }

    /**
     * @param {ParameterDefinition} parameter
     */
    set taskParameter(parameter) {
        if (this.isInputMapping) {
            this.source = parameter;
        } else {
            this.target = parameter;
        }
    }

    get implementationParameter() {
        return this._implementationParameter;
    }

    /**
     * @param {ImplementationParameterDefinition} parameter
     */
    set implementationParameter(parameter) {
        this._implementationParameter = parameter;
        if (this.isInputMapping) {
            this.target = parameter;
        } else {
            this.source = parameter;
        }
    }

    /**
     * Returns the name of the implementation parameter if there is an implementation parameter; else an empty string.
     */
    get implementationParameterName() {
        return this.implementationParameter ? this.implementationParameter.name : '';
    }

    /**
     * Returns the id of the implementation parameter if there is an implementation parameter; else an empty string.
     */
    get implementationParameterId() {
        const id = this.isInputMapping ? this.targetRef : this.sourceRef;
        return id;
    }

    /**
     * Either source or target will be undefined, because one refers to the task-implementation's input/output parameter
     * @returns {ParameterDefinition | ImplementationParameterDefinition}
     */
    get source() {
        return this.caseDefinition.getElement(this.sourceRef, ParameterDefinition);
    }

    set source(parameter) {
        this.sourceRef = parameter ? parameter.id : undefined;
    }

    /**
     * Either source or target will be undefined, because one refers to the task-implementation's input/output parameter
     * @returns {ParameterDefinition | ImplementationParameterDefinition}
     */
    get target() {
        return this.caseDefinition.getElement(this.targetRef, ParameterDefinition);
    }

    set target(parameter) {
        this.targetRef = parameter ? parameter.id : undefined;
    }

    /**
     * Returns true if there are no fields set in the mapping (i.e., it was a generated one)
     */
    isEmpty() {
        if (this.targetRef) { // Perhaps an empty input mapping
            // Check whether it is a generated mapping, by determining whether a binding is set
            if (this.sourceRef && this.source && this.source == this.taskParameter && !this.taskParameter.bindingRef) {
                if (!this.body) {
                    return true;
                }
            }
            return !this.sourceRef && !this.body;
        } else if (this.sourceRef) { // Perhaps an empty output mapping 
            return !this.targetRef && !this.body;
        } else if (this.body) { // Probably empty generated output mapping
            return false;
        } else {
            // That is really weird, how could we end up here
            return true;
        }
    }

    /**
     * @returns {Boolean}
     */
    get isInputMapping() {
        const task = this.parent;
        if (task.inputs.find(input => input.id === this.sourceRef)) {
            return true;
        } else if (task.outputs.find(output => output.id === this.targetRef)) {
            return false;
        } else if (task.implementationModel) {
            const implementation = task.implementationModel;
            if (implementation.findInputParameter(this.targetRef)) {
                return true;
            } else if (implementation.findOutputParameter(this.sourceRef)) {
                return false;
            } else {
                if (this.sourceRef && this.targetRef) {
                    console.log(`Cannot find sourceRef ${this.sourceRef} and targetRef ${this.targetRef} of ${task.type} '${task.name}' in the input and output parameters of the task implementation '${task.implementationRef}'.`)
                } else if (this.sourceRef) {
                    console.log(`Cannot find targetRef ${this.sourceRef} in the input parameters of ${task.type} '${task.name}' and also not in the output parameters of task implementation '${task.implementationRef}'.`)
                } else if (this.targetRef) {
                    console.log(`Cannot find targetRef ${this.targetRef} in the output parameters of ${task.type} '${task.name}' and also not in the input parameters of task implementation '${task.implementationRef}'.`)
                }
                return false;
            }
        } else if (! task.implementationRef) {
            if (this.sourceRef && this.targetRef) {
                console.log(`Cannot find sourceRef ${this.sourceRef} and targetRef ${this.targetRef} in the input and output parameters of ${task.type} '${task.name}'.`)
            } else if (this.sourceRef) {
                console.log(`Cannot find sourceRef ${this.sourceRef} in the input parameters of ${task.type} '${task.name}'.`)
            } else if (this.targetRef) {
                console.log(`Cannot find targetRef ${this.targetRef} in the output parameters of ${task.type} '${task.name}'.`)
            }
            return false;
        }
    }

    get body() {
        return this.transformation ? this.transformation.body : '';
    }

    set body(expression) {
        if (expression) {
            this.getTransformation().body = expression;
            if (this.isInputMapping) { 
                // If it is an input mapping, we need to make sure there is an actual corresponding task input parameter as well.
                if (! this.sourceRef) {
                    if (this.targetRef) { // Actually, a target ref always exists, otherwise there would not be a mapping option
                        this.sourceRef = this.parent.createInputParameterWithName(this.implementationParameterName||this.implementationParameterId).id;
                    }
                }
            }
        } else {
            if (this.transformation) {
                this.transformation.removeDefinition();
            }
        }
    }

    getTransformation() {
        if (!this.transformation) {
            this.transformation = this.createDefinition(ExpressionDefinition);
        }
        return this.transformation;
    }

    set language(newLanguage) {
        if (newLanguage) {
            this.getTransformation().language = newLanguage;
        }
    }

    get language() {
        if (this.transformation) return this.transformation.language;
    }

    get hasCustomLanguage() {
        return this.transformation && this.transformation.hasCustomLanguage;
    }

    createExportNode(parentNode) {
        if (this.isEmpty()) {
            return;
        }
        super.createExportNode(parentNode, 'parameterMapping', 'sourceRef', 'targetRef', 'transformation');
    }
}

class InputMappingDefinition extends ParameterMappingDefinition {
    get isInputMapping() {
        return true;
    }
}

class OutputMappingDefinition extends ParameterMappingDefinition {
    get isInputMapping() {
        return false;
    }

    createExportNode(parentNode) {
        super.createExportNode(parentNode);
        // It is allowed to have empty sourceRef attributes for output mappings; note that there must be an export node (i.e., tranformation is available)
        if (this.exportNode !== undefined && !this.sourceRef) {
            this.exportNode.setAttribute('sourceRef', '');
        }
    }
}
