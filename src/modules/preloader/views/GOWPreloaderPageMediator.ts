import {getInstance, LoadEvent, LoadGroup, LoadManager} from "fsuite";

import {BaseMediator} from "../../../appframework/base/mediators/BaseMediator";
import {LoadGroupName} from "../../../appframework/load/LoadGroupName";
import {GlobalEventDispatcher} from "../../../appframework/globaleventdispatcher/dispatcher/GlobalEventDispatcher";
import {GOWPreloaderPageView} from "./GOWPreloaderPageView";

export class GOWPreloaderPageMediator extends BaseMediator {

    protected activator: GOWPreloaderPageView;

    protected globalDispatcher: GlobalEventDispatcher = getInstance(GlobalEventDispatcher);
    protected loadManager: LoadManager = getInstance(LoadManager);

    protected initLoadGroup: LoadGroup;

    onActivatorStart(activator: any): void {
        super.onActivatorStart(activator);

        this.initLoadGroup = this.loadManager.getGroup(LoadGroupName.INIT);
        this.eventListenerHelper.addEventListener(
            this.initLoadGroup,
            LoadEvent.PROGRESS,
            this.onLoaderProgress
        );

        this.onLoaderProgress();
    }

    protected onLoaderProgress(): void {
        this.activator.loadingProgress = this.initLoadGroup.progress;
    }

}