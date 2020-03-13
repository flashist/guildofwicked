import {
    serviceLocatorAdd
} from "fsuite";

import {BaseModule} from "../base/modules/BaseModule";
import {ServerModel} from "./models/ServerModel";

export class ServerModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(ServerModel, {isSingleton: true});
    }

}