import {serviceLocatorAdd} from "fsuite";

import {BaseModule} from "../base/modules/BaseModule";
import {AssetsModel} from "./models/AssetsModel";

export class AssetsModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(AssetsModel, {isSingleton: true});
    }
}