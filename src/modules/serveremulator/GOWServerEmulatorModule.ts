import {serviceLocatorAdd} from "fsuite";

import {BaseModule} from "../../appframework/base/modules/BaseModule";
import {GOWServerEmulatorUsersManager} from "./managers/GOWServerEmulatorUsersManager";
import {GOWServerEmulatorManager} from "./managers/GOWServerEmulatorManager";
import {GOWServerEmulatorProductionManager} from "./managers/GOWServerEmulatorProductionManager";
import {GOWServerEmulatorGeneratorsManager} from "./managers/GOWServerEmulatorGeneratorsManager";

export class GOWServerEmulatorModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(GOWServerEmulatorManager, {isSingleton: true});
        serviceLocatorAdd(GOWServerEmulatorUsersManager, {isSingleton: true});
        serviceLocatorAdd(GOWServerEmulatorGeneratorsManager, {isSingleton: true});
        serviceLocatorAdd(GOWServerEmulatorProductionManager, {isSingleton: true});
    }

}