import {getInstance} from "fsuite";

import {BaseAppCommand} from "../../../appframework/base/commands/BaseAppCommand";
import {GOWGeneratorsModel} from "../models/GOWGeneratorsModel";
import {GOWGeneratorVO} from "../data/GOWGeneratorVO";

export class GOWGeneratorStopProductionClientCommand extends BaseAppCommand {

    protected generatorsModel: GOWGeneratorsModel = getInstance(GOWGeneratorsModel);

    constructor(protected generatorId: string) {
        super();
    }

    protected executeInternal(): void {
        const generatorData: GOWGeneratorVO = this.generatorsModel.getItem(this.generatorId);
        generatorData.update(
            {
                isProductionInProgress: false
            }
        );

        this.notifyComplete();
    }

}