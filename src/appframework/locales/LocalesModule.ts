import {serviceLocatorAdd, LocaleManager} from "fsuite";
import {BaseModule} from "../base/modules/BaseModule";

export class LocalesModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(LocaleManager, {isSingleton: true});
    }
}