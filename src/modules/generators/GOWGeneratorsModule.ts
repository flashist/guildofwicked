import {GenericObjectsByTypeModel, getInstance, serviceLocatorAdd} from "@flashist/flibs";

import {BaseModule} from "../../appframework/base/modules/BaseModule";
import {GOWGeneratorsModel} from "./models/GOWGeneratorsModel";

export class GOWGeneratorsModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(GOWGeneratorsModel, {isSingleton: true});
    }

    activateCompleteHook(): void {
        super.activateCompleteHook();

        const genericObjectsByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);
        const model: GOWGeneratorsModel = getInstance(GOWGeneratorsModel);
        genericObjectsByTypeModel.mapModelToType(model, model.itemsType);
    }
}