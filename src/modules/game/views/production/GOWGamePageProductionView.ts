import {Align, getInstance, getText, VAlign} from "fsuite";

import {BaseView} from "../../../../appframework/base/views/BaseView";
import {GOWGamePageModel} from "../../models/GOWGamePageModel";
import {GOWGamePageModelEvent} from "../../events/GOWGamePageModelEvent";
import {SimpleButtonView} from "../../../../appframework/display/views/button/SimpleButtonView";
import {GOWSettings} from "../../../../GOWSettings";

export class GOWGamePageProductionView extends BaseView {

    protected gamePageModel: GOWGamePageModel;

    protected moneyTabButton: SimpleButtonView;
    protected unitsTabButton: SimpleButtonView;

    protected construction(...args): void {
        super.construction(...args);

        this.gamePageModel = getInstance(GOWGamePageModel);

        this.moneyTabButton = new SimpleButtonView(
            {
                bgConfig: {
                    bgColor: GOWSettings.colors.yellow,
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
                    valign: VAlign.MIDDLE,

                    stroke: GOWSettings.colors.white,
                    strokeThickness: 1.5,

                    dropShadow: true,
                    dropShadowColor: GOWSettings.colors.white,
                    dropShadowDistance: 0,
                    dropShadowBlur: 4
                }
            }
        );
        this.addChild(this.moneyTabButton);
        //
        this.moneyTabButton.text = getText("money");

        this.unitsTabButton = new SimpleButtonView(
            {
                bgConfig: {
                    bgColor: GOWSettings.colors.yellow,
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
                    valign: VAlign.MIDDLE,

                    stroke: GOWSettings.colors.white,
                    strokeThickness: 1.5,

                    dropShadow: true,
                    dropShadowColor: GOWSettings.colors.white,
                    dropShadowDistance: 0,
                    dropShadowBlur: 4
                }
            }
        );
        this.addChild(this.unitsTabButton);
        //
        this.unitsTabButton.text = getText("units");
    }

    protected addListeners(): void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            this.gamePageModel,
            GOWGamePageModelEvent.TAB_ID_CHANGE,
            this.onTabIdChange
        )
    }

    protected onTabIdChange(): void {
        this.commitData();
    }

    protected commitData(): void {
        super.commitData();

        this.arrange();
    }

    protected arrange(): void {
        super.arrange();

        this.moneyTabButton.resize(
            Math.ceil(this.resizeSize.x / 2),
            70
        );

        this.unitsTabButton.resize(
            Math.ceil(this.resizeSize.x / 2),
            70
        );
        this.unitsTabButton.x = this.moneyTabButton.x + this.moneyTabButton.width;
    }
}