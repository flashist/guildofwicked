import {BaseMediator} from "../../../../appframework/base/mediators/BaseMediator";
import {GOWGamePageFooterView} from "./GOWGamePageFooterView";
import {InteractiveEvent} from "fsuite";

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
        alert("Imagine: Game Menu Open!");
    }
}