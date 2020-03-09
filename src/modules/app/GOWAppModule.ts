import {getInstance, serviceLocatorAdd} from "fsuite";

import {BaseModule} from "../../appframework/base/modules/BaseModule";
import {DefaultAppConfigVO} from "../../appframework/app/data/DefaultAppConfigVO";
import {GOWDefaultAppConfigVO} from "./data/GOWDefaultAppConfigVO";

export class GOWAppModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(GOWDefaultAppConfigVO, {toSubstitute: DefaultAppConfigVO});
    }

}