import {Align, FLabel, Graphics, VAlign} from "fsuite";

import {BaseView} from "../../../../appframework/base/views/BaseView";
import {GOWSettings} from "../../../../GOWSettings";
import {SimpleButtonView} from "../../../../appframework/display/views/button/SimpleButtonView";

export class GOWGamePageFooterView extends BaseView {

    protected bg: Graphics;

    protected construction(...args): void {
        super.construction(...args);

        this.bg = new Graphics();
        this.addChild(this.bg);
        //
        this.bg.beginFill(GOWSettings.colors.grey);
        this.bg.drawRect(0, 0, 100, 100);
        this.bg.endFill();

        // TEST
        const testLabel: FLabel = new FLabel(
            {
                fontFamily: "Clarence",
                size: 36,
                color: GOWSettings.colors.black,
                autosize: true,
                align: Align.CENTER,
                valign: VAlign.MIDDLE
            }
        );
        this.addChild(testLabel);
        testLabel.text = "IT'S FOOTER!"
    }

    protected arrange(): void {
        super.arrange();

        this.bg.width = this.resizeSize.x;
        this.bg.height = this.resizeSize.y;
    }
}