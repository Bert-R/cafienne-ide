export class IDEHeader {
    /**
     * Constructs the footer of the IDE element.
     * @param {IDE} ide
     */
    constructor(ide) {
        this.ide = ide;
        this.html = $(
    `<div class="ide-header basicbox">
        <div class="btn-group">
          <label>Cafienne IDE - stripped version for "to-webpack"</label>
        </div>
    </div>`);
        this.ide.html.append(this.html);
    }
}
