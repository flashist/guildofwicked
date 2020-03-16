import {getInstance, Point} from "fsuite";

import {GOWSettings} from "../../../GOWSettings";
import {GOWBasePageView} from "../../pages/views/GOWBasePageView";
import {GOWGamePageHeaderView} from "./header/GOWGamePageHeaderView";
import {GOWGamePageFooterView} from "./footer/GOWGamePageFooterView";
import {ViewLazyCreationServiceLocatorStack} from "../../../appframework/display/views/viewstack/ViewLazyCreationServiceLocatorStack";
import {GamePageCityTabView} from "./city/GamePageCityTabView";
import {GOWGamePageTabId} from "../data/GOWGamePageTabId";
import {GOWGamePageModel} from "../models/GOWGamePageModel";
import {GOWGamePageModelEvent} from "../events/GOWGamePageModelEvent";
import {GamePageMapTabView} from "./map/GamePageMapTabView";

export class GOWGamePageView extends GOWBasePageView {

    protected gamePageModel: GOWGamePageModel;

    protected headerView: GOWGamePageHeaderView;
    protected footerView: GOWGamePageFooterView;

    protected gameTabStack: ViewLazyCreationServiceLocatorStack;

    protected construction(...args): void {
        this.bgColor = GOWSettings.colors.white;

        super.construction(...args);

        this.gamePageModel = getInstance(GOWGamePageModel);

        this.gameTabStack = new ViewLazyCreationServiceLocatorStack();
        this.contentCont.addChild(this.gameTabStack);
        //
        this.gameTabStack.addViewClass(
            GamePageCityTabView,
            GOWGamePageTabId.CITY
        );
        this.gameTabStack.addViewClass(
            GamePageMapTabView,
            GOWGamePageTabId.MAP
        );

        this.headerView = getInstance(GOWGamePageHeaderView);
        this.contentCont.addChild(this.headerView);

        this.footerView = getInstance(GOWGamePageFooterView);
        this.contentCont.addChild(this.footerView);
    }

    protected addListeners(): void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            this.gamePageModel,
            GOWGamePageModelEvent.TAB_ID_CHANGE,
            this.onGamePageTabIdChange
        );
    }

    protected onGamePageTabIdChange(): void {
        this.commitData();
    }


    protected commitData(): void {
        super.commitData();

        this.gameTabStack.selectedId = this.gamePageModel.tabId;
    }


    protected arrange(): void {
        super.arrange();

        const topLeftGlobal = this.toGlobal(new Point());
        const topLeftContentLocal = this.contentCont.toLocal(topLeftGlobal);

        const resizedScreenSizeLocal = new Point(
            this.resizeSize.x / this.contentCont.scale.x,
            this.resizeSize.y / this.contentCont.scale.y
        );

        this.headerView.resize(Math.ceil(resizedScreenSizeLocal.x), 140);
        this.headerView.x = Math.floor(topLeftContentLocal.x);
        this.headerView.y = Math.floor(topLeftContentLocal.y);

        this.footerView.resize(Math.ceil(resizedScreenSizeLocal.x), 70);
        this.footerView.x = Math.floor(topLeftContentLocal.x);
        this.footerView.y = Math.floor(topLeftContentLocal.y + resizedScreenSizeLocal.y - this.footerView.height);

        this.gameTabStack.resize(
            resizedScreenSizeLocal.x,
            Math.ceil(
                resizedScreenSizeLocal.y - this.headerView.resizeSize.y - this.footerView.resizeSize.y
            )
        );
        this.gameTabStack.x = this.headerView.x;
        this.gameTabStack.y = Math.floor(this.headerView.y + this.headerView.height);
    }
}