import {getInstance} from "fsuite";

import {BaseView} from "../../../../appframework/base/views/BaseView";
import {GOWGamePageProductionView} from "./production/GOWGamePageProductionView";
import {GOWGamePageVisualizationView} from "./visualization/GOWGamePageVisualizationView";

export class GamePageCityTabView extends BaseView {

    protected visualizationView: GOWGamePageVisualizationView;
    protected productionView: GOWGamePageProductionView;

    protected construction(...args): void {
        super.construction(...args);

        this.visualizationView = getInstance(GOWGamePageVisualizationView);
        this.addChild(this.visualizationView);

        this.productionView = getInstance(GOWGamePageProductionView);
        this.addChild(this.productionView);
    }
    
    protected arrange(): void {
        super.arrange();

        this.visualizationView.resize(
            Math.ceil(this.resizeSize.x),
            Math.ceil(this.resizeSize.y * 0.25)
        );

        this.productionView.resize(
            Math.ceil(this.resizeSize.x),
            Math.ceil(this.resizeSize.y - this.visualizationView.resizeSize.y)
        );
        this.productionView.y = Math.floor(this.visualizationView.resizeSize.y);
    }
}