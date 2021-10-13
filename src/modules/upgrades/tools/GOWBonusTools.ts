import {IGOWCumulativeBonusesData} from "../data/IGOWCumulativeBonusesData";
import {GenericObjectsByTypeModel, getInstance} from "@flashist/flibs";
import {IGOWBonusStaticVO} from "../data/IGOWBonusStaticVO";
import {GOWBonusType} from "../data/GOWBonusType";
import {GOWBonusStaticVOType} from "../data/GOWBonusStaticVOType";
import {IGOWUpgradeStaticVO} from "../data/IGOWUpgradeStaticVO";
import {GOWUpgradeStaticVOType} from "../data/GOWUpgradeStaticVOType";

export class GOWBonusTools {
    static getBonusIdsFromUpgradeIds(upgradeIds: string[]): string[] {
        const genericByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);
        const bonusIds: string[] = [];
        for (let singleUpgradeId of upgradeIds) {
            const upgradeData: IGOWUpgradeStaticVO = genericByTypeModel.getItem(GOWUpgradeStaticVOType, singleUpgradeId);
            bonusIds.push(upgradeData.bonusId);
        }

        return bonusIds;
    }

    static getCumulativeBonusesFromUgpradesData(upgradeIds: string[]): IGOWCumulativeBonusesData {
        const bonusIds: string[] = GOWBonusTools.getBonusIdsFromUpgradeIds(upgradeIds);
        return GOWBonusTools.getCumulativeBonusesData(bonusIds);
    }

    static getCumulativeBonusesData(bonusIds: string[]): IGOWCumulativeBonusesData {
        const result: IGOWCumulativeBonusesData = {};

        const genericByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);
        for (let singleBonusId of bonusIds) {
            const singleBonus: IGOWBonusStaticVO = genericByTypeModel.getItem(
                GOWBonusStaticVOType,
                singleBonusId
            );

            if (singleBonus) {
                if (!result[singleBonus.bonusType]) {
                    result[singleBonus.bonusType] = 0;
                }

                if (singleBonus.bonusType === GOWBonusType.AUTO) {
                    result[singleBonus.bonusType] = 1;
                } else {
                    result[singleBonus.bonusType] += singleBonus.bonusValue;
                }
            }
        }

        return result
    }
}