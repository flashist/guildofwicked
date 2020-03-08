import {BaseObject, Logger} from "fcore";
import {getInstance} from "fsuite";

import {StrategiesModel} from "../models/StrategiesModel";
import {BaseStrategy} from "../strategies/BaseStrategy";
import {StrategiesModelEvent} from "../models/StrategiesModelEvent";

export class StrategiesManager extends BaseObject {

    protected strategiesModel: StrategiesModel;

    protected activeStrategy: BaseStrategy;

    protected construction(...args): void {
        super.construction(args);

        this.strategiesModel = getInstance(StrategiesModel);
    }

    protected addListeners(): void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            this.strategiesModel,
            StrategiesModelEvent.ACTIVE_STRATEGY_CHANGE,
            this.onActiveStrategyChange
        );
    }

    protected onActiveStrategyChange(): void {
        let ActiveClass = this.strategiesModel.getActiveStrategyClass();
        let tempStrategy: BaseStrategy = getInstance(ActiveClass);
        this.activateStrategy(tempStrategy);
    }

    protected async activateStrategy(strategy: BaseStrategy) {
        await this.deactivateCurrentStrategy();

        this.activeStrategy = strategy;
        if (this.activeStrategy) {
            this.activeStrategy.activate();
        }
    }

    protected async deactivateCurrentStrategy() {
        if (this.activeStrategy) {
            await this.activeStrategy.deactivate();
        }
    }

}