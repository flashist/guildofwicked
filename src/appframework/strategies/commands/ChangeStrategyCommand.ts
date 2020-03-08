import {Command} from "fcore";
import {getInstance} from "fsuite";

import {StrategiesModel} from "../models/StrategiesModel";

export class ChangeStrategyCommand extends Command {

    constructor(protected strategyId: string) {
        super();
    }

    protected executeInternal(): void {
        super.executeInternal();

        let strategiesModel: StrategiesModel = getInstance(StrategiesModel);
        strategiesModel.setActiveStrategyId(this.strategyId);

        this.notifyComplete();
    }
}