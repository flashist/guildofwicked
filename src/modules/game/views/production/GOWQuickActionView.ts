import {BaseView} from "../../../../appframework/base/views/BaseView";
import {SimpleButtonView} from "../../../../appframework/display/views/button/SimpleButtonView";
import {GOWSettings} from "../../../../GOWSettings";
import {Align, AutosizeType, getText, InteractiveEvent, VAlign} from "fsuite";

export class GOWQuickActionView extends BaseView {
    protected button: SimpleButtonView;

    protected construction(...args): void {
        super.construction(...args);

        this.button = new SimpleButtonView(
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
                    size: 36,
                    color: GOWSettings.colors.black,
                    autosize: true,
                    align: Align.CENTER,
                    valign: VAlign.MIDDLE
                }
            }
        );
        this.addChild(this.button);
        this.button.text = getText("quickActionBtnPlaceholder");

        // TODO: at the current moment the button is just a plcaeholder,
        // later the button would have few modes and each mode would have it's own display mode,
        // each mode would be responsible for each action (e.g. start production, buy, upgrade)
    }

    protected addListeners(): void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            this.button,
            InteractiveEvent.TAP,
            this.onTap
        );
    }

    protected onTap(): void {
        alert("Imagine: Quick Action Perofrmed!");
    }

    protected arrange(): void {
        super.arrange();

        this.button.resize(this.resizeSize.x, this.resizeSize.y);
    }
}