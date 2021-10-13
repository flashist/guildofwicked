import {serviceLocatorAdd} from "@flashist/flibs";

import {BaseModule} from "../../appframework/base/modules/BaseModule";
import {DefaultAppConfigVO} from "../../appframework/app/data/DefaultAppConfigVO";
import {GOWDefaultAppConfigVO} from "./data/GOWDefaultAppConfigVO";
import {GOWAppMainContainer} from "./views/GOWAppMainContainer";
import {AppMainContainer} from "../../appframework/app/views/AppMainContainer";
import {GOWSimplePopupView} from "./views/GOWSimplePopupView";
import {GOWSimplePopupMediator} from "./views/GOWSimplePopupMediator";

export class GOWAppModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(GOWDefaultAppConfigVO, {toSubstitute: DefaultAppConfigVO});
        serviceLocatorAdd(GOWAppMainContainer, {toSubstitute: AppMainContainer});
        serviceLocatorAdd(GOWSimplePopupView, {activateeConstructors: [GOWSimplePopupMediator]});
    }

}