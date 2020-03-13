import {IGOWCumulativeBonusesData} from "../data/IGOWCumulativeBonusesData";
import {GenericObjectsByTypeModel, getInstance} from "fsuite";
import {IGOWBonusStaticVO} from "../data/IGOWBonusStaticVO";
import {GOWBonusVOStaticType} from "../data/GOWBonusVOStaticType";
import {GOWBonusType} from "../data/GOWBonusType";

export class GOWBonusTools {
    static getCumulativeBonusesData(bonusIds: string[]): IGOWCumulativeBonusesData {
        const result: IGOWCumulativeBonusesData = {};

        const genericByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);
        for (let singleBonusId of bonusIds) {
            const singleBonus: IGOWBonusStaticVO = genericByTypeModel.getItem(
                GOWBonusVOStaticType,
                singleBonusId
            );

            if (singleBonus) {
                if (!result[singleBonus.id]) {
                    result[singleBonus.id] = 0;
                }

                if (singleBonus.type === GOWBonusType.AUTO) {
                    result[singleBonus.id] = 1;
                } else {
                    result[singleBonus.id] += singleBonus.value;
                }
            }
        }

        return result
    }
}