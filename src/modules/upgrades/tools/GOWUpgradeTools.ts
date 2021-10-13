import {GOWUpgradeType} from "../data/GOWUpgradeType";
import {IGOWUpgradeStaticVO} from "../data/IGOWUpgradeStaticVO";
import {GenericObjectsByTypeModel, getInstance} from "@flashist/flibs";
import {GOWGeneratorVOType} from "../../generators/data/GOWGeneratorVOType";
import {GOWGeneratorVO} from "../../generators/data/GOWGeneratorVO";
import {GOWUpgradesStaticModel} from "../models/GOWUpgradesStaticModel";

export class GOWUpgradeTools {

    static findGeneratorUpgrades(
        generatorId: string,
        config: {
            upgradeType?: GOWUpgradeType,
            bought?: boolean
        }): IGOWUpgradeStaticVO[] {

        const result: IGOWUpgradeStaticVO[] = [];

        const genericByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);
        const generatorData: GOWGeneratorVO = genericByTypeModel.getItem(GOWGeneratorVOType, generatorId);
        if (generatorData) {
            const upgradesStaticModel: GOWUpgradesStaticModel = getInstance(GOWUpgradesStaticModel);
            const generatorUpgrades: IGOWUpgradeStaticVO[] = upgradesStaticModel.getGeneratorUpgrades(
                generatorId,
                config.upgradeType
            );

            for (let singleUpgradeData of generatorUpgrades) {
                if (config.bought !== undefined) {
                    const isBought: boolean = (generatorData.boughtUpgradeIds.indexOf(singleUpgradeData.id) !== -1);
                    if (isBought === config.bought) {
                        result.push(singleUpgradeData);
                    }

                } else {
                    result.push(singleUpgradeData);
                }
            }
        }

        return result;
    }


}