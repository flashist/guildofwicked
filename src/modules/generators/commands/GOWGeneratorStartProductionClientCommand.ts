import {BaseAppCommand} from "../../../appframework/base/commands/BaseAppCommand";
import {GOWGeneratorsModel} from "../models/GOWGeneratorsModel";
import {getInstance} from "fsuite";
import {GOWGeneratorVO} from "../data/GOWGeneratorVO";
import {GOWTimeTools} from "../../time/tools/GOWTimeTools";
import {GOWGeneratorStartProductionServerRequestCommand} from "./GOWGeneratorStartProductionServerRequestCommand";

export class GOWGeneratorStartProductionClientCommand extends BaseAppCommand {

    protected generatorsModel: GOWGeneratorsModel = getInstance(GOWGeneratorsModel);

    constructor(protected generatorId: string, protected sendRequest: boolean = true) {
        super();
    }

    protected executeInternal(): void {
        console.log("GOWGeneratorStartProductionClientCommand __ time: ", Date.now());

        const generatorData: GOWGeneratorVO = this.generatorsModel.getItem(this.generatorId);
        generatorData.update(
            {
                isProductionInProgress: true,
                startProductionServerTime: GOWTimeTools.getCurrentServerTimeClientPrediction()
            }
        );

        if (this.sendRequest) {
            new GOWGeneratorStartProductionServerRequestCommand(this.generatorId)
                .execute()
                .then(
                    () => {
                        this.notifyComplete();
                    }
                );

        } else {
            this.notifyComplete();
        }
    }

}