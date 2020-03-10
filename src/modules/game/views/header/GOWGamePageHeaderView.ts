import {Align, getText, Graphics, VAlign} from "fsuite";

import {BaseView} from "../../../../appframework/base/views/BaseView";
import {GOWSettings} from "../../../../GOWSettings";
import {SimpleButtonView} from "../../../views/button/SimpleButtonView";

export class GOWGamePageHeaderView extends BaseView {

    protected bg: Graphics;

    protected cityBtn: SimpleButtonView;

    protected construction(...args): void {
        super.construction(...args);

        this.bg = new Graphics();
        this.addChild(this.bg);
        //
        this.bg.beginFill(GOWSettings.colors.grey);
        this.bg.drawRect(0, 0, 100, 100);
        this.bg.endFill();

        this.cityBtn = new SimpleButtonView(
            {
                bgConfig: {
                    bgColor: GOWSettings.colors.white,
                    bgAlpha: 1,
                    bgBorderColor: GOWSettings.colors.black,
                    bgBorderAlpha: 1,
                    bgBorderWidth: 2
                },
                labelConfig: {
                    fontFamily: "Clarence",
                    size: 48,
                    color: GOWSettings.colors.black,
                    autosize: true,
                    align: Align.CENTER,
                    valign: VAlign.MIDDLE
                }
            }
        );
        this.addChild(this.cityBtn);
        //
        this.cityBtn.resize(100, 100);
        this.cityBtn.text = getText("cityBtn");
    }

    protected arrange(): void {
        super.arrange();

        this.bg.width = this.resizeSize.x;
        this.bg.height = this.resizeSize.y;

        this.cityBtn.x = Math.floor(this.bg.x + this.bg.width - this.cityBtn.width - GOWSettings.layout.contentToBorderPadding);
        this.cityBtn.y = Math.floor(this.bg.y + GOWSettings.layout.contentToBorderPadding);
    }
}