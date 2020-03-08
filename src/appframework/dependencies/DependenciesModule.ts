import {Logger, ConsoleCustomLoggerItem} from "fcore";

import {
    GenericObjectsByTypeModel,
    serviceLocatorAdd
} from "fsuite";

import {BaseModule} from "../base/modules/BaseModule";

export class DependenciesModule extends BaseModule {

    init(): void {
        super.init();

        // Modules
        serviceLocatorAdd(GenericObjectsByTypeModel, {isSingleton: true});
    }
}