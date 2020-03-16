import {BaseMediator} from "../../../../appframework/base/mediators/BaseMediator";
import {GOWGamePageFooterView} from "./GOWGamePageFooterView";
import {getText, InteractiveEvent} from "fsuite";
import {GOWShowTextHintFromCursorCommand} from "../../../hints/command/GOWShowTextHintFromCursorCommand";

export class GOWGamePageFooterMediator extends BaseMediator<GOWGamePageFooterView> {

    onActivatorStart(activator: GOWGamePageFooterView): void {
        super.onActivatorStart(activator);

        this.eventListenerHelper.addEventListener(
            this.activator.menuBtn,
            InteractiveEvent.TAP,
            this.onMenuBtn
        );
    }

    protected onMenuBtn(): void {
        // alert("Imagine: Game Menu Opened!");
        new GOWShowTextHintFromCursorCommand(getText("menuBtnHintPlaceholder"))
            .execute();
    }
}