import {serviceLocatorAdd} from "fsuite";

import {BaseModule} from "../../appframework/base/modules/BaseModule";
import {GOWProductionManager} from "./managers/GOWProductionManager";

export class GOWProductionModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(GOWProductionManager, {isSingleton: true});
    }

}