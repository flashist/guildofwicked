import {getInstance, LoadEvent, LoadGroup, LoadManager} from "fsuite";

import {BaseMediator} from "../../../appframework/base/mediators/BaseMediator";
import {LoadGroupName} from "../../../appframework/load/LoadGroupName";
import {GOWPreloaderPageView} from "./GOWPreloaderPageView";
import {GOWPreloaderPageViewEvent} from "./GOWPreloaderPageViewEvent";
import {ChangePageCommand} from "../../../appframework/pages/commands/ChangePageCommand";
import {PageId} from "../../../appframework/pages/PageId";

export class GOWPreloaderPageMediator extends BaseMediator<GOWPreloaderPageView> {

    protected loadManager: LoadManager = getInstance(LoadManager);

    protected initLoadGroup: LoadGroup;

    onActivatorStart(activator: GOWPreloaderPageView): void {
        super.onActivatorStart(activator);

        this.initLoadGroup = this.loadManager.getGroup(LoadGroupName.INIT);
        this.eventListenerHelper.addEventListener(
            this.initLoadGroup,
            LoadEvent.PROGRESS,
            this.onLoaderProgress
        );

        this.eventListenerHelper.addEventListener(
            this.activator,
            GOWPreloaderPageViewEvent.PROGRESS_COMPLETE,
            this.onViewProgressComplete
        );

        this.onLoaderProgress();
    }

    protected onLoaderProgress(): void {
        this.activator.loadingProgress = this.initLoadGroup.progress;
    }

    private onViewProgressComplete() {
        // Timeout is set for user-experience purpuse,
        // to keep the 100% loading information a bit longer on the screen
        setTimeout(
            () => {
                new ChangePageCommand(PageId.GAME_PAGE_ID)
                    .execute();
            },
            1000
        );
    }
}