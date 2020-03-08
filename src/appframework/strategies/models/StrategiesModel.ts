import {IConstructor} from "fcore";

import {BaseModel} from "../../base/models/BaseModel";
import {StrategiesModelEvent} from "./StrategiesModelEvent";
import {BaseStrategy} from "../strategies/BaseStrategy";

export class StrategiesModel extends BaseModel {

    protected configToIdMap: { [key: string]: IConstructor<BaseStrategy> } = {};
    protected activeStrategyId: string;

    public setActiveStrategyId(id: string): void {
        this.activeStrategyId = id;
        this.dispatchEvent(StrategiesModelEvent.ACTIVE_STRATEGY_CHANGE);
    }

    public getActiveStrategyClass(): IConstructor<BaseStrategy> {
        return this.configToIdMap[this.activeStrategyId];
    }

    public addStrategyClass(id: string, Class: IConstructor<BaseStrategy>): void {
        this.configToIdMap[id] = Class;
    }

}