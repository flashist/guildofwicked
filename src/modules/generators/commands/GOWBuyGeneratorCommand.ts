import {GenericObjectsByTypeModel, getInstance} from "@flashist/flibs";

import {BaseSpendResourcesWithCheckCommand} from "../../resources/commands/BaseSpendResourcesWithCheckCommand";
import {IGOWResourceVO} from "../../resources/data/IGOWResourceVO";
import {GOWGeneratorVO} from "../data/GOWGeneratorVO";
import {GOWGeneratorVOType} from "../data/GOWGeneratorVOType";
import {GOWGeneralBuyServerRequestCommand} from "../../server/commands/GOWGeneralBuyServerRequestCommand";
import {GOWGeneratorsTools} from "../tools/GOWGeneratorsTools";

export class GOWBuyGeneratorCommand extends BaseSpendResourcesWithCheckCommand {

    protected genericByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);
    protected generatorData: GOWGeneratorVO;

    constructor(protected generatorId: string) {
        super();

        this.genericByTypeModel = getInstance(GenericObjectsByTypeModel);
        this.generatorData = this.genericByTypeModel.getItem(GOWGeneratorVOType, this.generatorId);
    }

    protected get resourcesToSpend(): IGOWResourceVO[] {
        return [
            {
                type: this.generatorData.static.basePrice.type,
                value: GOWGeneratorsTools.calculateNextLevelPrice(
                    this.generatorData.static.basePrice.value,
                    this.generatorData.level,
                    this.generatorData.static.buyCoef
                )
            }
        ];
    }

    protected enoughResourcesExecute(): void {
        // Fake change data locally (for better user experience)
        this.generatorData.update(
            {
                level: this.generatorData.level + 1
            }
        );

        new GOWGeneralBuyServerRequestCommand(this.generatorData.type, this.generatorData.id)
            .execute()
            .then(
                () => {
                    this.notifyComplete();
                }
            );
    }

}