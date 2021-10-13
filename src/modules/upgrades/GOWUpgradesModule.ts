import {GenericObjectsByTypeModel, getInstance, serviceLocatorAdd} from "@flashist/flibs";

import {BaseModule} from "../../appframework/base/modules/BaseModule";
import {GOWUpgradesStaticModel} from "./models/GOWUpgradesStaticModel";

export class GOWUpgradesModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(GOWUpgradesStaticModel, {isSingleton: true});
    }

    activateCompleteHook(): void {
        super.activateCompleteHook();

        const genericObjectsByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);
        const model: GOWUpgradesStaticModel = getInstance(GOWUpgradesStaticModel);
        genericObjectsByTypeModel.mapModelToType(model, model.itemsType);
    }

}