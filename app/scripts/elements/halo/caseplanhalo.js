import {Halo} from "./halo";
import {PropertiesHaloItem} from "./item/haloclickitems";
import {DeleteHaloItem} from "./item/haloclickitems";
import {HaloClickItem} from "./item/haloclickitems";
import {HaloItem} from "./item/haloitem";

export class CasePlanHalo extends Halo {
    /**
     * Create the halo for the caseplan model. This halo is situated next to the top tab of the case plan model
     * @param {CasePlanModel} element
     */
    constructor(element) {
        super(element);
        this.element = element;
    }

    createItems() {
        // All content in the topbar, next to the top tab (or next to the planning table).
        this.topBar.addItems(
            PropertiesHaloItem, DeleteHaloItem,
            SeparatorHaloItem,
            CaseInputParametersHaloItem, CaseOutputParametersHaloItem,StartCaseSchemaHaloItem, CaseRolesHaloItem,
            SeparatorHaloItem,
            ViewSourceHaloItem, DeployHaloItem, DebuggerHaloItem
        );
    }

    setHaloPosition() {
        // Determine new left and top, relative to element's position in the case paper
        const casePaper = this.element.case.paperContainer;

        // We need to make the halo a bit lower and on the right hand side of the top tab or the planning table.
        const leftCorrection = this.element.planItemDefinition.planningTable ? 310 : 260;
        const haloLeft = this.element.shape.x - casePaper.scrollLeft() + leftCorrection;
        const haloTop = this.element.shape.y - casePaper.scrollTop() + 24;

        this.html.css('left', haloLeft);
        this.html.css('top', haloTop);
        this.html.width(this.element.shape.width);
        this.html.height(this.element.shape.height);
    }
}

// Below a series of caseplan specific halo items

export class CaseInputParametersHaloItem extends HaloClickItem {
    constructor(halo) {
        super(halo, 'images/input_128.png', 'Edit case input parameters', e => this.halo.element.case.caseParametersEditor.open());
    }
}

export class CaseOutputParametersHaloItem extends HaloClickItem {
    constructor(halo) {
        super(halo, 'images/output_128.png', 'Edit case output parameters', e => this.halo.element.case.caseParametersEditor.open());
    }
}

export class CaseRolesHaloItem extends HaloClickItem {
    constructor(halo) {
        super(halo, 'images/roles_128.png', 'Edit case team', e => this.halo.element.case.rolesEditor.open());
    }
}

export class StartCaseSchemaHaloItem extends HaloClickItem {
    constructor(halo) {
        super(halo, 'images/startcaseschema_128.png', 'Edit start case schema', e => this.halo.element.case.startCaseEditor.open());
    }
}

export class DeployHaloItem extends HaloClickItem {
    constructor(halo) {
        super(halo, 'images/deploy_128.png', 'Deploy this case', e => this.halo.element.case.deployForm.open());
    }
}

export class ViewSourceHaloItem extends HaloClickItem {
    constructor(halo) {
        super(halo, 'images/viewsource_128.png', 'View source of this case', e => this.halo.element.case.viewSource());
    }
}

export class DebuggerHaloItem extends HaloClickItem {
    constructor(halo) {
        super(halo, 'images/debug.png', 'Debug cases of this type', e => this.halo.element.case.openDebugger());
    }
}

export class SeparatorHaloItem extends HaloItem {
    constructor(halo) {
        super(halo, '', '');
    }
}
