import {getInstance} from "fsuite";
import {BaseMediator} from "../../../../../appframework/base/mediators/BaseMediator";
import {GOWGamePageProductionView} from "./GOWGamePageProductionView";
import {ToggleGroupEvent} from "../../../../../appframework/display/views/togglegroup/ToggleGroupEvent";
import {GOWGamePageModel} from "../../../models/GOWGamePageModel";

export class GOWGamePageProductionMediator extends BaseMediator<GOWGamePageProductionView> {

    protected gamePageModel: GOWGamePageModel = getInstance(GOWGamePageModel);

    onActivatorStart(activator: GOWGamePageProductionView): void {
        super.onActivatorStart(activator);

        this.eventListenerHelper.addEventListener(
            this.activator.tabsToggleGroup,
            ToggleGroupEvent.SELECTED_ID_CHANGE,
            this.onToggleGroupChange
        );
    }

    protected onToggleGroupChange(): void {
        this.gamePageModel.productionTabId = this.activator.tabsToggleGroup.selectedId;
    }
}