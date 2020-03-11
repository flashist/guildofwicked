import {IGOWStaticGeneratorVO} from "../data/IGOWStaticGeneratorVO";
import {GenericObjectsByTypeModel, getInstance} from "fsuite";
import {GOWGeneratorVOStaticType} from "../data/GOWGeneratorVOStaticType";

export class GOWGeneratorsTools {
    static getStartGenerators(): IGOWStaticGeneratorVO[] {
        let result: IGOWStaticGeneratorVO[] = [];

        const genericByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel)
        const allGenerators: IGOWStaticGeneratorVO[] = genericByTypeModel.getItemsForType(GOWGeneratorVOStaticType);
        for (let singleGenerator of allGenerators) {
            if (singleGenerator.isStartGenerator) {
                result.push(singleGenerator);
            }
        }

        return result;
    }
}