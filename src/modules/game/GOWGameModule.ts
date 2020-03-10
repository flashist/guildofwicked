import {getInstance, serviceLocatorAdd} from "fsuite";

import {BaseModule} from "../../appframework/base/modules/BaseModule";
import {PagesModel} from "../../appframework/pages/models/PagesModel";
import {PageId} from "../../appframework/pages/PageId";
import {GOWGamePageView} from "./views/GOWGamePageView";
import {GOWGamePageMediator} from "./views/GOWGamePageMediator";
import {GOWGameModel} from "./models/GOWGameModel";

export class GOWGameModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(GOWGameModel, {isSingleton: true});
        serviceLocatorAdd(GOWGamePageView, {activateesConstructors: [GOWGamePageMediator]});
    }

    activateCompleteHook(): void {
        super.activateCompleteHook();

        let pagesModel: PagesModel = getInstance(PagesModel);
        pagesModel.addPageViewClass(GOWGamePageView, PageId.GAME_PAGE_ID);
    }
}