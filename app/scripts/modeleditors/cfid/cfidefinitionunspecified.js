'use strict';

const PROPERTY_MAP = {
    'http://www.omg.org/spec/CMMN/PropertyType/string': {
        type: 'string',
        defaultValue: 'string'
    },
    'http://www.omg.org/spec/CMMN/PropertyType/boolean': {
        type: 'boolean',
        defaultValue: true
    },
    'http://www.omg.org/spec/CMMN/PropertyType/integer': {
        type: 'integer'
    },
    'http://www.omg.org/spec/CMMN/PropertyType/float': {
        type: 'number',
        format: 'float'
    },
    'http://www.omg.org/spec/CMMN/PropertyType/time': {
        type: 'string',
        format: 'time'
    },
    'http://www.omg.org/spec/CMMN/PropertyType/date':  {
        type: 'string',
        format: 'date'
    },
    'http://www.omg.org/spec/CMMN/PropertyType/dateTime': {
        type: 'string',
        format: 'dateTime'
    },
    'http://www.omg.org/spec/CMMN/PropertyType/anyURI': {
        type: 'string',
        defaultValue: 'anyURI'
    },
    'http://www.omg.org/spec/CMMN/PropertyType/QName': {
        type: 'string',
        defaultValue: 'QName'
    },
    'http://www.omg.org/spec/CMMN/PropertyType/double': {
        type: 'number',
        format: 'double'
    },
    'http://www.omg.org/spec/CMMN/PropertyType/duration': {
        type: 'string',
        defaultValue: 'duration'
    },
    'http://www.omg.org/spec/CMMN/PropertyType/gYearMonth': {
        type: 'string',
        defaultValue: 'gYearMonth'
    },
    'http://www.omg.org/spec/CMMN/PropertyType/gYear': {
        type: 'string',
        defaultValue: 'gYear'
    },
    'http://www.omg.org/spec/CMMN/PropertyType/gMonthDay': {
        type: 'string',
        defaultValue: 'gMonthDay'
    },
    'http://www.omg.org/spec/CMMN/PropertyType/gDay': {
        type: 'string',
        defaultValue: 'gDay'
    },
    'http://www.omg.org/spec/CMMN/PropertyType/hexBinary': {
        type: 'string',
        defaultValue: 'hexBinary'
    },
    'http://www.omg.org/spec/CMMN/PropertyType/base64Binary': {
        type: 'string',
        defaultValue: 'base64Binary'
    },
    'http://www.omg.org/spec/CMMN/PropertyType/decimal': {
        type: 'number',
        format: 'decimal'
    },
    'http://www.omg.org/spec/CMMN/PropertyType/Unspecified': {
        type: 'object',
        defaultValue: {}
    },
}

class CFIDefinitionUnspecified {
    /**
     * 
     * @param {CaseFileItemDefinitionEditor} editor 
     * @param {JQuery<HTMLElement>} container 
     */
    constructor(editor, container) {
        this.editor = editor;
        this.container = container;
        this.html = $(`<div class="cfiDefinitionUnspecPropertyTreeTable">
                <label>Properties</label>
                <div class="divTable" style="border:1px solid black">
                </div>
                <div style="margin-top:10px;" >
                    <button class="buttonSchemaGenerator">Generate JSON Schema</button>
                    <button class="buttonCopySchema">Copy to clipboard</button>
                </div>
                <div style="position:relative;top:10px;height:200px;bottom:1px;border:1px solid green">
                    <textarea style="display:block;width:100%;height:100%;font-family:courier new" class="textareaJSONSchema"></textarea>
                </div>
            </div>`);
        this.tableDiv = this.html.find('.divTable');
        this.jsonSchemaDiv = this.html.find('.textareaJSONSchema');
        this.html.find('.buttonSchemaGenerator').on('click', e => this.generateJSONSchema());
        this.html.find('.buttonCopySchema').on('click', e => this.copyJSONSchema());
        this.container.append(this.html);
    }

    generateJSONSchema() {
        /** @type {CaseFileDefinitionDefinition} */
        const definition = this.data;
        const propertyNames = definition.properties.map(p => p.name)
        const result = {
            title: definition.name,
            description: definition.description,
            type: "object",
            required: propertyNames,
            properties: {

            }
        };
        definition.properties.forEach(property => {
            const name = property.name;
            result.properties[name] = this.convertProperty(property);
        });
        const schema = {
            schema: result,
            uiSchema: {}
        }
        // console.log("Generated json schema: ", schema);

        this.html.find('.textareaJSONSchema').val(JSON.stringify(schema, null, 2));
    }

    copyJSONSchema() {
        this.html.find('.textareaJSONSchema').select();
        document.execCommand("copy");
        this.html.find('.textareaJSONSchema').blur();
        ide.info("Copied schema to clipboard", 2000);

    }

    /**
     * Converts an XSD property into a JSON schema type
     * @returns {*}
     * @param {PropertyDefinition} property 
     */
    convertProperty(property) {
        const defaults = PROPERTY_MAP[property.type] || { type: 'string' };
        return Object.assign({ title: property.name }, defaults);
    }

    /**
     * 
     * @param {CaseFileDefinitionDefinition} data 
     */
    show(data) {
        this.jsonSchemaDiv.val('');
        Util.clearHTML(this.tableDiv);
        this.tableDiv.html(`<table>
                                <colgroup>
                                    <col class="propertyDeletebtcol" width="20px" ></col>
                                    <col class="propertyNamecol" width="180px"></col>
                                    <col class="propertyTypecol" width="100px"></col>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>`);
        this.data = data;
        this.data.properties.forEach(property => this.addProperty(property));
        this.addProperty();
    }

    /**
     * 
     * @param {PropertyDefinition} property 
     */
    addProperty(property = undefined) {
        if (property === undefined) {
            // create a new, empty parameter at the end of the table
            property = this.data.createDefinition(PropertyDefinition);
            property.name = '';
            property.type = '';
            property.isNew = true;
        }

        const html = $(`<tr>
            <td><button class="removeProperty"></button></td>
            <td><input class="inputPropertyName" value="${property.name}" /></td>
            <td><select class="selectPropertyType">
                    <option value=""></option>
                    <option value="http://www.omg.org/spec/CMMN/PropertyType/string">string</option>
                    <option value="http://www.omg.org/spec/CMMN/PropertyType/boolean">boolean</option>
                    <option value="http://www.omg.org/spec/CMMN/PropertyType/integer">integer</option>
                    <option value="http://www.omg.org/spec/CMMN/PropertyType/float">float</option>
                    <option value="http://www.omg.org/spec/CMMN/PropertyType/time">time</option>
                    <option value="http://www.omg.org/spec/CMMN/PropertyType/date">date</option>
                    <option value="http://www.omg.org/spec/CMMN/PropertyType/dateTime">dateTime</option>
                    <option value="http://www.omg.org/spec/CMMN/PropertyType/anyURI">anyURI</option>
                    <option value="http://www.omg.org/spec/CMMN/PropertyType/QName">QName</option>
<!-- These elements not (yet) supported

                    <option value="http://www.omg.org/spec/CMMN/PropertyType/double">double</option>
                    <option value="http://www.omg.org/spec/CMMN/PropertyType/duration">duration</option>
                    <option value="http://www.omg.org/spec/CMMN/PropertyType/gYearMonth">gYearMonth</option>
                    <option value="http://www.omg.org/spec/CMMN/PropertyType/gYear">gYear</option>
                    <option value="http://www.omg.org/spec/CMMN/PropertyType/gMonthDay">gMonthDay</option>
                    <option value="http://www.omg.org/spec/CMMN/PropertyType/gDay">gDay</option>
                    <option value="http://www.omg.org/spec/CMMN/PropertyType/hexBinary">hexBinary</option>
                    <option value="http://www.omg.org/spec/CMMN/PropertyType/base64Binary">base64Binary</option>
                    <option value="http://www.omg.org/spec/CMMN/PropertyType/decimal">decimal</option>
-->
                    <option value="http://www.omg.org/spec/CMMN/PropertyType/Unspecified">Unspecified</option>
                </select>
            </td>
        </tr>`);
        html.find('.removeProperty').on('click', e => {
            if (property.isNew) {
                return;
            }
            Util.removeFromArray(this.data.properties, property);
            Util.removeHTML(html);
            this.editor.saveModel();
        });
        html.find('.inputPropertyName').on('change', e => this.changeProperty(html, property, e.currentTarget.value, property.type));
        // Remove "readonly" upon dblclick; id's are typically generated because they must be unique across multiple models
        html.find('.selectPropertyType').on('change', e => this.changeProperty(html, property, property.name, e.currentTarget.value));
        html.find('.selectPropertyType').val(property.type);
        this.html.find('tbody').append(html);
    }

    changeProperty(html, parameter, name, type) {
        if (parameter.isNew) {
            // No longer transient parameter
            parameter.isNew = false;
            this.data.properties.push(parameter);
            this.addProperty();
        }
        parameter.name = name;
        parameter.type = type;
        if (!parameter.id) parameter.id = Util.createID('_', 4) + '_' + name.replace(/\s/g, '');
        if (!parameter.name) parameter.name = parameter.id;
        // Make sure a newly generated id is rendered as well.
        html.find('.inputParameterName').val(parameter.name);
        html.find('.inputParameterId').val(parameter.id);
        html.find('.inputParameterId').attr('readonly', 'true');
        this.editor.saveModel();
    }
}
