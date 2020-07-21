import {HaloItem} from "./haloitem";

export class HaloClickItem extends HaloItem {
    constructor(halo, imgURL, title, clickHandler, html) {
        super(halo, imgURL, title, html);
        this.html.on('click', e => clickHandler(e));
    }
}

export class PropertiesHaloItem extends HaloClickItem {
    /**
     * Returns the default bar in which this item appears
     * @param {Halo} halo
     */
    static defaultBar(halo) {
        return halo.leftBar;
    }

    constructor(halo) {
        super(halo, 'images/settings_32.png', 'Open properties of the ' + halo.element.typeDescription, e => this.element.propertiesView.show(true));
    }
}

export class DeleteHaloItem extends HaloClickItem {
    /**
     * Returns the default bar in which this item appears
     * @param {Halo} halo
     */
    static defaultBar(halo) {
        return halo.leftBar;
    }

    constructor(halo) {
        super(halo, 'images/delete_64.png', 'Delete the ' + halo.element.typeDescription, e => this.element.case.__removeElement(this.element));
    }
}

export class InputParametersHaloItem extends HaloClickItem {
    /**
     * Returns the default bar in which this item appears
     * @param {Halo} halo
     */
    static defaultBar(halo) {
        return halo.leftBar;
    }

    constructor(halo) {
        super(halo, 'images/task_input_128.png', 'Open input parameter mappings of the ' + halo.element.typeDescription, e => this.element.showMappingsEditor());
    }
}

export class OutputParametersHaloItem extends HaloClickItem {
    /**
     * Returns the default bar in which this item appears
     * @param {Halo} halo
     */
    static defaultBar(halo) {
        return halo.rightBar;
    }

    constructor(halo) {
        super(halo, 'images/task_output_128.png', 'Open output parameter mappings of the ' + halo.element.typeDescription, e => this.element.showMappingsEditor());
    }
}

export class ZoomTaskImplementationHaloItem extends HaloClickItem {
    /**
     * Returns the default bar in which this item appears
     * @param {Halo} halo
     */
    static defaultBar(halo) {
        return halo.leftBar;
    }

    constructor(halo) {
        const implementationRef = halo.element.planItemDefinition.implementationRef;
        const imgURL = 'images/zoomin_64.png';
        const title = 'Open task implementation - ' + implementationRef + '\nRight-click to open in new tab';
        const html = $(`<a href="./#${implementationRef}" title="${title}" ><img src="${imgURL}" /></a>`);
        super(halo, imgURL, title, e => window.location.hash = implementationRef, html);
    }
}

export class NewTaskImplemenationHaloItem extends HaloClickItem {
    /**
     * Returns the default bar in which this item appears
     * @param {Halo} halo
     */
    static defaultBar(halo) {
        return halo.leftBar;
    }

    constructor(halo) {
        super(halo, 'images/model_24.png', 'Create a new implementation for the task', e => this.element.generateNewTaskImplementation());
    }
}
