import {serviceLocatorAdd} from "fsuite";

import {BaseModule} from "../base/modules/BaseModule";
import {ContainersManager} from "./managers/ContainersManager";

export class ContainersModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(ContainersManager, {isSingleton: true});
    }
}