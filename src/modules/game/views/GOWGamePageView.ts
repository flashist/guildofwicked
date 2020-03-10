import {FLabel, getInstance, getText, Point} from "fsuite";

import {GOWSettings} from "../../../GOWSettings";
import {GOWBasePageView} from "../../pages/views/GOWBasePageView";
import {GOWGamePageHeaderView} from "./header/GOWGamePageHeaderView";
import {GOWGamePageFooterView} from "./footer/GOWGamePageFooterView";
import {GOWGamePageVisualizationView} from "./visualization/GOWGamePageVisualizationView";
import {GOWGamePageProductionView} from "./production/GOWGamePageProductionView";

export class GOWGamePageView extends GOWBasePageView {

    protected headerView: GOWGamePageHeaderView;
    protected footerView: GOWGamePageFooterView;
    protected visualizationView: GOWGamePageVisualizationView;
    protected productionView: GOWGamePageProductionView;

    protected construction(...args): void {
        this.bgColor = GOWSettings.colors.white;

        super.construction(...args);

        this.visualizationView = getInstance(GOWGamePageVisualizationView);
        this.contentCont.addChild(this.visualizationView);

        this.productionView = getInstance(GOWGamePageProductionView);
        this.contentCont.addChild(this.productionView);

        this.headerView = getInstance(GOWGamePageHeaderView);
        this.contentCont.addChild(this.headerView);

        this.footerView = getInstance(GOWGamePageFooterView);
        this.contentCont.addChild(this.footerView);
    }

    protected arrange(): void {
        super.arrange();

        const topLeftGlobal = this.toGlobal(new Point());
        const topLeftContentLocal = this.contentCont.toLocal(topLeftGlobal);

        const screenSizeLocal = new Point(
            this.resizeSize.x / this.contentCont.scale.x,
            this.resizeSize.y / this.contentCont.scale.y
        );

        this.headerView.resize(Math.ceil(screenSizeLocal.x), 140);
        this.headerView.x = Math.floor(topLeftContentLocal.x);
        this.headerView.y = Math.floor(topLeftContentLocal.y);

        this.footerView.resize(Math.ceil(screenSizeLocal.x), 70);
        this.footerView.x = Math.floor(topLeftContentLocal.x);
        this.footerView.y = Math.ceil(topLeftContentLocal.y + screenSizeLocal.y - this.footerView.height);

        this.visualizationView.resize(
            Math.ceil(screenSizeLocal.x),
            Math.ceil((screenSizeLocal.y / 2) - (this.headerView.y + this.headerView.height))
        );
        this.visualizationView.x = Math.floor(topLeftContentLocal.x);
        this.visualizationView.y = Math.floor(this.headerView.y + this.headerView.height);

        this.productionView.resize(
            Math.ceil(screenSizeLocal.x),
            Math.ceil((screenSizeLocal.y / 2) - this.footerView.height)
        );
        this.productionView.x = Math.floor(topLeftContentLocal.x);
        this.productionView.y = Math.floor(screenSizeLocal.y / 2);
    }
}