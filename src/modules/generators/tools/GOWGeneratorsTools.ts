import {IGOWGeneratorStaticVO} from "../data/IGOWGeneratorStaticVO";
import {GenericObjectsByTypeModel, getInstance} from "fsuite";
import {GOWGeneratorVOStaticType} from "../data/GOWGeneratorVOStaticType";

export class GOWGeneratorsTools {
    static getStartGenerators(): IGOWGeneratorStaticVO[] {
        let result: IGOWGeneratorStaticVO[] = [];

        const genericByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel)
        const allGenerators: IGOWGeneratorStaticVO[] = genericByTypeModel.getItemsForType(GOWGeneratorVOStaticType);
        for (let singleGenerator of allGenerators) {
            if (singleGenerator.isStartGenerator) {
                result.push(singleGenerator);
            }
        }

        return result;
    }
}