import {serviceLocatorAdd} from "fsuite";

import {PagesView} from "./views/PagesView";
import {PagesModel} from "./models/PagesModel";
import {BaseModule} from "../base/modules/BaseModule";
import {PagesViewMediator} from "./views/PagesViewMediator";

export class PagesModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(PagesModel, {isSingleton: true});
        serviceLocatorAdd(PagesView, {activateesConstructors: [PagesViewMediator]});
    }
}