import {getInstance, serviceLocatorAdd} from "fsuite";

import {BaseModule} from "../../appframework/base/modules/BaseModule";
import {PagesModel} from "../../appframework/pages/models/PagesModel";
import {PageId} from "../../appframework/pages/PageId";
import {GOWGamePageView} from "./views/GOWGamePageView";
import {GOWGamePageModel} from "./models/GOWGamePageModel";
import {GOWGeneratorProductionItemRendererView} from "./views/production/list/GOWGeneratorProductionItemRendererView";
import {GOWGeneratorProductionItemRendererMediator} from "./views/production/list/GOWGeneratorProductionItemRendererMediator";

export class GOWGameModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(GOWGamePageModel, {isSingleton: true});
        serviceLocatorAdd(GOWGeneratorProductionItemRendererView, {activateeConstructors: [GOWGeneratorProductionItemRendererMediator]});
    }

    activateCompleteHook(): void {
        super.activateCompleteHook();

        let pagesModel: PagesModel = getInstance(PagesModel);
        pagesModel.addPageViewClass(GOWGamePageView, PageId.GAME_PAGE_ID);
    }
}