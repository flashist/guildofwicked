import {serviceLocatorAdd} from "fsuite";

import {BaseModule} from "../../appframework/base/modules/BaseModule";
import {GOWServerModel} from "./models/GOWServerModel";
import {ServerModel} from "../../appframework/server/models/ServerModel";

export class GOWServerModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(GOWServerModel, {toSubstitute: ServerModel});
    }

}