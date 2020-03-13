import {getInstance, serviceLocatorAdd} from "fsuite";

import {BaseModule} from "../../appframework/base/modules/BaseModule";
import {GOWProductionManagers} from "./managers/GOWProductionManagers";

export class GOWProductionModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(GOWProductionManagers, {isSingleton: true});
    }

}