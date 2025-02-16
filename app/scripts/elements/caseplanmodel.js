﻿const MINTEXTWIDTHCPM = 200;
const CPM_WIDTH = 800;
const CPM_HEIGHT = 500;
const CPM_TAB_HEIGHT = 22;

class CasePlanModel extends Stage {
    /**
     * 
     * @param {Case} cs 
     * @param {*} x 
     * @param {*} y 
     */
    static create(cs, x = 10, y = 10) {
        const definition = cs.caseDefinition.getCasePlan();
        const shape = cs.dimensions.createShape(x, y, 800, 500, definition.id);
        return new CasePlanModel(cs, definition, shape)
    }

    /**
     * Creates a new CasePlan model
     * @param {*} parent Must be the Case object itself.
     * @param {CasePlanDefinition} definition 
     * @param {ShapeDefinition} shape 
     */
    constructor(parent, definition, shape) {
        super(parent, definition, definition, shape);
        // A case plan is both a plan item and a planitem definition
        //  It is also a stage, and a stage has distinctive plan item and planitem definition.
        //  Inside stage, we set a pointer to this.definition and this.planItemDefinition, pointing to this.definition.definition
        //  However, for case plan, there is no definition.definition, rather the case plan is the definition.definition itself.
        //  But stage is not aware of that, and relies on a planItemDefinition being present; hence we overwrite the property here.
        this.planItemDefinition = definition;
    }

    createProperties() {
        return new CasePlanProperties(this);
    }

    createHalo() {
        return new CasePlanHalo(this);
    }

    /**
     * Show or hide the halo and resizer
     * @param {Boolean} show 
     */
    __renderBoundary(show) {
        if (this.case.selectedElement === this) {
            this.resizer.visible = true;
        } else {
            this.resizer.visible = false;
        }
        this.halo.visible = true;
    }

    hideHalo() {
        this.halo.visible = false;
    }

    get __planningTablePosition() {
        return { x: 280, y: 13 };
    }

    surrounds(element) {
        // Avoid the Stage.acquireChildren method to throw out elements outside the case plan (even though visually they can be dragged outside)
        return element != this;
    }

    get markup() {
        return `<g>
                    <polyline class="cmmn-shape cmmn-border cmmn-caseplan-header-shape" points="10,${CPM_TAB_HEIGHT} 15,0 250,0 255,${CPM_TAB_HEIGHT}" />
                    <text class="cmmn-bold-text" font-size="12" />
                    <rect class="cmmn-shape cmmn-border cmmn-caseplan-shape" x="0" y="${CPM_TAB_HEIGHT}" width="${this.shape.width}" height="${this.shape.height - CPM_TAB_HEIGHT}"/>
                </g>
                ${this.decoratorBox}`;
    }

    get textAttributes() {
        return {
            'text': {
                'ref': '.cmmn-shape',
                'ref-x': .5,
                'ref-y': 18,
                'x-alignment': 'middle',
                'y-alignment': 'bottom'
            }
        };
    }

    createDecorators() {
        return [
            new Decorator(AUTOCOMPLETE_IMG, () => this.planItemDefinition.autoComplete),
        ];
    }

    /**
     * Override of basic resize method.
     * @param {*} w 
     * @param {*} h 
     */
    __resize(w, h) {
        super.__resize(w, h);
        // The rect must also be given some new dimensions
        this.html.find('.cmmn-border').attr('width', this.shape.width);
        this.html.find('.cmmn-border').attr('height', this.shape.height - CPM_TAB_HEIGHT);
    }

    __delete() {
        super.__delete();
        delete this.case.casePlanModel;
    }

    canHaveCriterion(criterionType) {
        return criterionType == ExitCriterion.name;
    }

    createCMMNChild(cmmnType, x, y) {
        if (cmmnType == ExitCriterion) {
            return this.__addCMMNChild(ExitCriterion.create(this, x, y));
        } else {
            return super.createCMMNChild(cmmnType, x, y);
        }
    }
}
CMMNElement.registerType(CasePlanModel, 'Case Plan', 'images/svg/caseplanmodel.svg');
