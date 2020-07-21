import {ModelDefinition} from "../../modeldefinition";
import {ShapeDefinition} from "./shape";
import {TextBoxShape} from "./shape";
import {CaseFileItemShape} from "./shape";
import {Edge} from "./edge";
import {CustomShape} from "./shape";
import {Util} from "../../../util/util";
import {XML} from "../../../util/xml";

export const DIMENSIONS = 'dimensions';
export const CMMNDI = 'CMMNDI';
export const CMMNDIAGRAM = 'CMMNDiagram';
export const CMMNSHAPE = 'CMMNShape';
export const CMMNEDGE = 'CMMNEdge';
export const BOUNDS = 'Bounds';
export const WAYPOINT = 'waypoint';
export const CMMNELEMENTREF = 'cmmnElementRef';
export const SOURCECMMNELEMENTREF = 'sourceCMMNElementRef';
export const TARGETCMMNELEMENTREF = 'targetCMMNElementRef';

export class Dimensions extends ModelDefinition {
    /**
     * Parses the content of the XML document into dimension structures that can be accessed via this class.
     * @param {Element} importNode
     * @param {DefinitionDocument} definitionDocument
     */
    constructor(importNode, definitionDocument) {
        super(importNode, definitionDocument);
        this.definitionDocument = definitionDocument;
        this.errors = [];
        /** @type {Array<ShapeDefinition>} */
        this.shapes = this.parseElements(CMMNSHAPE, ShapeDefinition);
        this.parseElements('textbox', TextBoxShape, this.shapes);
        this.parseElements('casefileitem', CaseFileItemShape, this.shapes);
        /** @type {Array<Edge>} */
        this.edges = this.parseElements(CMMNEDGE, Edge);
    }

    /**
     * @returns {Array<CustomShape>}
     */
    get customShapes() {
        return this.shapes.filter(shape => shape instanceof CustomShape);
    }

    /**
     * While parsing the XML, an error may occur. This is stored in the overall list of parse errors.
     * @param {String} msg
     */
    addParseError(msg) {
        this.errors.push(msg);
    }

    /**
     * While parsing the XML, we may encounter valid but incomplete content, for which a warning will be generated.
     * @param {String} msg
     */
    addParseWarning(msg) {
        this.errors.push(msg);
    }

    /**
     * Returns the shape with the identifier or undefined.
     * @param {CMMNElementDefinition} definition
     * @returns {ShapeDefinition}
     */
    getShape(definition) {
        return this.shapes.find(shape => definition && shape.cmmnElementRef == definition.id);
    }

    /**
     * Adds a shape to the dimensions list.
     * @param {ShapeDefinition} shape
     */
    addShape(shape) {
        this.shapes.push(shape);
    }

    /**
     * Removes the shape
     * @param {ShapeDefinition} shape
     */
    removeShape(shape) {
        Util.removeFromArray(this.shapes, shape);
    }

    toXML() {
        const dimString = `<${CMMNDI}> <${CMMNDIAGRAM} /> </${CMMNDI}>`;
        const dimensionsXML = XML.loadXMLString(dimString);
        const diagramNode = dimensionsXML.getElementsByTagName(CMMNDIAGRAM)[0];
        this.shapes.forEach(shape => shape.createExportNode(diagramNode));
        this.edges.forEach(edge => edge.createExportNode(diagramNode));
        return dimensionsXML;
    }
}
