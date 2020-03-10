import {BaseMediator} from "../../../../appframework/base/mediators/BaseMediator";
import {GOWGamePageProductionView} from "./GOWGamePageProductionView";
import {ToggleGroupEvent} from "../../../../appframework/display/views/togglegroup/ToggleGroupEvent";
import {GOWGamePageModel} from "../../models/GOWGamePageModel";

export class GOWGamePageProdcuctionMediator extends BaseMediator<GOWGamePageProductionView> {

    protected gamePageModel: GOWGamePageModel;

    onActivatorStart(activator: GOWGamePageProductionView): void {
        super.onActivatorStart(activator);

        this.eventListenerHelper.addEventListener(
            this.activator.tabsToggleGroup,
            ToggleGroupEvent.SELECTED_ID_CHANGE,
            this.onToggleGroupChange
        );
    }

    protected onToggleGroupChange(): void {
        this.gamePageModel.tabId = this.activator.tabsToggleGroup.selectedId;
    }
}