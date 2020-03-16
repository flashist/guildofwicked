import {FLabel} from "fsuite";

import {BaseView} from "../../../../appframework/base/views/BaseView";
import {GOWSettings} from "../../../../GOWSettings";

export class GamePageCityTabView extends BaseView {

    protected testLabel: FLabel;

    protected construction(...args): void {
        super.construction(...args);

        this.testLabel = new FLabel({
            fontFamily: "Clarence",
            size: 24,
            color: GOWSettings.colors.greyLight,
            autosize: true,

            stroke: GOWSettings.colors.black,
            strokeThickness: 1.5,

            dropShadow: true,
            dropShadowColor: GOWSettings.colors.black,
            dropShadowDistance: 0,
            dropShadowBlur: 2
        });
        this.addChild(this.testLabel);
        this.testLabel.text = "MAP TAB VIEW!";
    }
    
    protected arrange(): void {
        super.arrange();

        this.testLabel.x =  Math.floor((this.resizeSize.x - this.testLabel.width) / 2);
        this.testLabel.y =  Math.floor((this.resizeSize.y - this.testLabel.height) / 2);
    }
}