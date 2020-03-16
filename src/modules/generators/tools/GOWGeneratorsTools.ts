import {IGOWGeneratorStaticVO} from "../data/IGOWGeneratorStaticVO";
import {GenericObjectsByTypeModel, getInstance} from "fsuite";
import {GOWGeneratorStaticVOType} from "../data/GOWGeneratorStaticVOType";

export class GOWGeneratorsTools {

    static calculateNextLevelPrice(basePrice: number, curLevel: number, priceGrowthCoef: number): number {
        return basePrice * Math.pow(priceGrowthCoef, curLevel);
    }

    static getStartGenerators(): IGOWGeneratorStaticVO[] {
        let result: IGOWGeneratorStaticVO[] = [];

        const genericByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel)
        const allGenerators: IGOWGeneratorStaticVO[] = genericByTypeModel.getItemsForType(GOWGeneratorStaticVOType);
        for (let singleGenerator of allGenerators) {
            if (singleGenerator.isStartGenerator) {
                result.push(singleGenerator);
            }
        }

        return result;
    }
}