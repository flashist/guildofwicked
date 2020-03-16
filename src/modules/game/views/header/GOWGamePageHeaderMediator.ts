import {getInstance, InteractiveEvent} from "fsuite";

import {BaseMediator} from "../../../../appframework/base/mediators/BaseMediator";
import {GOWGamePageHeaderView} from "./GOWGamePageHeaderView";
import {GOWGamePageModel} from "../../models/GOWGamePageModel";
import {GOWGamePageTabId} from "../../data/GOWGamePageTabId";

export class GOWGamePageHeaderMediator extends BaseMediator<GOWGamePageHeaderView> {

    protected gamePageModel: GOWGamePageModel = getInstance(GOWGamePageModel);

    onActivatorStart(activator: GOWGamePageHeaderView): void {
        super.onActivatorStart(activator);

        this.eventListenerHelper.addEventListener(
            this.activator.mapBtn,
            InteractiveEvent.TAP,
            this.onMap
        );

        this.eventListenerHelper.addEventListener(
            this.activator.cityBtn,
            InteractiveEvent.TAP,
            this.onCity
        );
    }

    protected onCity(): void {
        this.gamePageModel.tabId = GOWGamePageTabId.CITY;
    }

    protected onMap(): void {
        this.gamePageModel.tabId = GOWGamePageTabId.MAP;
    }
}