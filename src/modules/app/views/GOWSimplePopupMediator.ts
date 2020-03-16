import {GOWSimplePopupView} from "./GOWSimplePopupView";
import {BaseMediator} from "../../../appframework/base/mediators/BaseMediator";
import {GOWSimplePopupIntent} from "../events/GOWSimplePopupIntent";
import {InteractiveEvent} from "fsuite";

export class GOWSimplePopupMediator extends BaseMediator<GOWSimplePopupView> {

    onActivatorStart(activator: GOWSimplePopupView): void {
        super.onActivatorStart(activator);

        this.eventListenerHelper.addEventListener(
            this.activator.modalBg,
            InteractiveEvent.TAP,
            this.onHide
        );

        this.eventListenerHelper.addEventListener(
            this.activator.closeBtn,
            InteractiveEvent.TAP,
            this.onHide
        );

        this.eventListenerHelper.addEventListener(
            this.globalDispatcher,
            GOWSimplePopupIntent.SHOW,
            this.onShow
        );

        this.eventListenerHelper.addEventListener(
            this.globalDispatcher,
            GOWSimplePopupIntent.HIDE,
            this.onHide
        );
    }

    private onShow(text: string) {
        this.activator.show(text);
    }

    private onHide() {
        this.activator.hide();
    }
}