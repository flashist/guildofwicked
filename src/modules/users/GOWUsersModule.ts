import {GenericObjectsByTypeModel, getInstance, IGenericObjectVO, serviceLocatorAdd} from "@flashist/flibs";

import {BaseModule} from "../../appframework/base/modules/BaseModule";
import {GOWUsersModel} from "./models/GOWUsersModel";

export class GOWUsersModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(GOWUsersModel, {isSingleton: true});
    }

    activateCompleteHook(): void {
        super.activateCompleteHook();

        const genericObjectsByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);
        const model: GOWUsersModel = getInstance(GOWUsersModel);
        genericObjectsByTypeModel.mapModelToType(model, model.itemsType);
    }

}