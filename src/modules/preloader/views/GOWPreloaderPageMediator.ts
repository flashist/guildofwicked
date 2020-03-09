import {BaseMediator} from "../../../appframework/base/mediators/BaseMediator";

export class GOWPreloaderPageMediator extends BaseMediator {

    /*protected activator: PreloaderPageView;

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

        //
        this.activator.visible = GameSettings.views.preloader.show;
    }

    protected onLoaderProgress(): void {
        this.activator.loadingProgress = this.initLoadGroup.progress;
    }*/

}