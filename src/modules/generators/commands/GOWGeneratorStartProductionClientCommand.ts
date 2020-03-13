import {BaseAppCommand} from "../../../appframework/base/commands/BaseAppCommand";
import {GOWGeneratorsModel} from "../models/GOWGeneratorsModel";
import {getInstance} from "fsuite";
import {GOWGeneratorVO} from "../data/GOWGeneratorVO";
import {GOWTimeTools} from "../../time/tools/GOWTimeTools";
import {GOWGeneratorStartProductionServerCommand} from "./GOWGeneratorStartProductionServerCommand";

export class GOWGeneratorStartProductionClientCommand extends BaseAppCommand {

    protected generatorsModel: GOWGeneratorsModel = getInstance(GOWGeneratorsModel);

    constructor(protected generatorId: string) {
        super();
    }

    protected executeInternal(): void {
        const generatorData: GOWGeneratorVO = this.generatorsModel.getItem(this.generatorId);
        generatorData.update(
            {
                isProductionInProgress: true,
                startProductionServerTime: GOWTimeTools.getCurrentServerTimeClientPrediction()
            }
        );

        new GOWGeneratorStartProductionServerCommand(this.generatorId)
            .execute()
            .then(
                () => {
                    this.notifyComplete();
                }
            );
    }

}