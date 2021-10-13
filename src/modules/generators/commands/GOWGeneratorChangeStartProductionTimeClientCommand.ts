import {BaseAppCommand} from "../../../appframework/base/commands/BaseAppCommand";
import {GOWGeneratorsModel} from "../models/GOWGeneratorsModel";
import {getInstance} from "@flashist/flibs";
import {GOWGeneratorVO} from "../data/GOWGeneratorVO";
import {GOWTimeTools} from "../../time/tools/GOWTimeTools";

export class GOWGeneratorChangeStartProductionTimeClientCommand extends BaseAppCommand {

    protected generatorsModel: GOWGeneratorsModel = getInstance(GOWGeneratorsModel);

    constructor(protected generatorId: string, protected startClientTime: number) {
        super();
    }

    protected executeInternal(): void {
        const generator: GOWGeneratorVO = this.generatorsModel.getItem(this.generatorId);
        if (generator.isProductionInProgress) {
            generator.update(
                {
                    startProductionServerTime: GOWTimeTools.convertClientToServerTime(this.startClientTime)
                }
            );
        }

        this.notifyComplete();
    }

}