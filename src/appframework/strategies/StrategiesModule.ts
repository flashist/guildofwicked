import {serviceLocatorAdd} from "fsuite";
import {StrategiesModel} from "./models/StrategiesModel";
import {StrategiesManager} from "./managers/StrategiesManager";
import {BaseModule} from "../base/modules/BaseModule";

export class StrategiesModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(StrategiesModel, {isSingleton: true});
        serviceLocatorAdd(StrategiesManager, {isSingleton: true, forceCreation: true});
    }
}