import {serviceLocatorAdd} from "fsuite";

import {BaseModule} from "../../appframework/base/modules/BaseModule";
import {InitApplicationDataCommand} from "../../appframework/init/commands/InitApplicationDataCommand";
import {GOWInitApplicationDataCommand} from "./commands/GOWInitApplicationDataCommand";

export class GOWInitModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(GOWInitApplicationDataCommand, {toSubstitute: InitApplicationDataCommand});
    }

}