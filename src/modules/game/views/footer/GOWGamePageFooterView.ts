import {Align, FLabel, Graphics, VAlign} from "fsuite";

import {BaseView} from "../../../../appframework/base/views/BaseView";
import {GOWSettings} from "../../../../GOWSettings";
import {SimpleButtonView} from "../../../../appframework/display/views/button/SimpleButtonView";

export class GOWGamePageFooterView extends BaseView {

    protected bg: Graphics;

    // protected testLabel: FLabel;
    public menuBtn: SimpleButtonView;

    protected construction(...args): void {
        super.construction(...args);

        this.bg = new Graphics();
        this.addChild(this.bg);
        //
        this.bg.beginFill(GOWSettings.colors.grey);
        this.bg.drawRect(0, 0, 100, 100);
        this.bg.endFill();

        /*// TEST
        this.testLabel = new FLabel(
            {
                fontFamily: "Clarence",
                size: 36,
                color: GOWSettings.colors.black,
                autosize: true,
                align: Align.CENTER,
                valign: VAlign.MIDDLE
            }
        );
        this.addChild(this.testLabel);
        this.testLabel.text = "IT'S FOOTER!"*/

        this.menuBtn = new SimpleButtonView(
            {
                bgConfig: {
                    image: {
                        imageId: "icon-burger.png"
                    },
                    resizeBg: false
                }
            }
        );
        this.addChild(this.menuBtn);
    }

    protected arrange(): void {
        super.arrange();

        this.bg.width = this.resizeSize.x;
        this.bg.height = this.resizeSize.y;

        this.menuBtn.x = this.bg.x + Math.floor((this.bg.width - this.menuBtn.width) / 2);
        this.menuBtn.y = this.bg.y + Math.floor((this.bg.height - this.menuBtn.height) / 2);
    }
}