import {IGOWCumulativeBonusesData} from "../data/IGOWCumulativeBonusesData";
import {GenericObjectsByTypeModel, getInstance} from "fsuite";
import {IGOWBonusStaticVO} from "../data/IGOWBonusStaticVO";
import {GOWBonusType} from "../data/GOWBonusType";
import {GOWBonusStaticVOType} from "../data/GOWBonusStaticVOType";

export class GOWBonusTools {
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
                    result[singleBonus.bonusType] += singleBonus.value;
                }
            }
        }

        return result
    }
}