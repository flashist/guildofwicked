import {Align, getText, InteractiveEvent, VAlign} from "fsuite";

import {BaseView} from "../../../../../appframework/base/views/BaseView";
import {SimpleButtonView} from "../../../../../appframework/display/views/button/SimpleButtonView";
import {GOWSettings} from "../../../../../GOWSettings";
import {GOWShowTextHintFromCursorCommand} from "../../../../hints/command/GOWShowTextHintFromCursorCommand";

export class GOWQuickActionView extends BaseView {
    protected button: SimpleButtonView;

    protected construction(...args): void {
        super.construction(...args);

        this.button = new SimpleButtonView(
            {
                bgConfig: {
                    vector: {
                        bgColor: GOWSettings.colors.white,
                        overBgColor: GOWSettings.colors.yellow,
                        bgAlpha: 1,
                        bgBorderColor: GOWSettings.colors.black,
                        bgBorderAlpha: 1,
                        bgBorderWidth: 2
                    },
                    resizeBg: true
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
        new GOWShowTextHintFromCursorCommand(getText("quickActionBtnHinPlaceholder"))
            .execute();
    }

    protected arrange(): void {
        super.arrange();

        this.button.resize(this.resizeSize.x, this.resizeSize.y);
    }
}