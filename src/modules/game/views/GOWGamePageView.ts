import {FContainer, FLabel, getText} from "fsuite";

import {GOWSettings} from "../../../GOWSettings";
import {GOWBasePageView} from "../../pages/views/GOWBasePageView";

export class GOWGamePageView extends GOWBasePageView {

    protected contentCont: FContainer;
    protected titleField: FLabel;

    protected construction(...args): void {
        this.bgColor = GOWSettings.colors.white;

        super.construction(...args);

        this.titleField = new FLabel({
            fontFamily: "Clarence",
            size: 72,
            color: GOWSettings.colors.black,
            autosize: true
        });
        this.contentCont.addChild(this.titleField);
        this.titleField.text = getText("gamePageTest");
        this.titleField.x = this.sizeArea.x + Math.floor((this.sizeArea.width - this.titleField.width) / 2);
        this.titleField.y = this.sizeArea.x + Math.floor((this.sizeArea.height - this.titleField.height) / 2);
    }

}