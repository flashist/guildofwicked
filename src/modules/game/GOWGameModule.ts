import {getInstance, serviceLocatorAdd} from "fsuite";

import {BaseModule} from "../../appframework/base/modules/BaseModule";
import {PagesModel} from "../../appframework/pages/models/PagesModel";
import {PageId} from "../../appframework/pages/PageId";
import {GOWGamePageView} from "./views/GOWGamePageView";
import {GOWGamePageModel} from "./models/GOWGamePageModel";
import {GOWGeneratorProductionItemRendererView} from "./views/production/list/GOWGeneratorProductionItemRendererView";
import {GOWGeneratorProductionItemRendererMediator} from "./views/production/list/GOWGeneratorProductionItemRendererMediator";
import {GOWGamePageFooterView} from "./views/footer/GOWGamePageFooterView";
import {GOWGamePageFooterMediator} from "./views/footer/GOWGamePageFooterMediator";
import {GOWGeneratorProductionManagersView} from "./views/production/list/managers/GOWGeneratorProductionManagersView";
import {GOWGeneratorProductionManagersMediator} from "./views/production/list/managers/GOWGeneratorProductionManagersMediator";
import {GOWGamePageProductionView} from "./views/production/GOWGamePageProductionView";
import {GOWGamePageProductionMediator} from "./views/production/GOWGamePageProductionMediator";

export class GOWGameModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(GOWGamePageModel, {isSingleton: true});
        serviceLocatorAdd(GOWGeneratorProductionItemRendererView, {activateeConstructors: [GOWGeneratorProductionItemRendererMediator]});
        serviceLocatorAdd(GOWGeneratorProductionManagersView, {activateeConstructors: [GOWGeneratorProductionManagersMediator]});
        serviceLocatorAdd(GOWGamePageProductionView, {activateeConstructors: [GOWGamePageProductionMediator]});
        serviceLocatorAdd(GOWGamePageFooterView, {activateeConstructors: [GOWGamePageFooterMediator]});
    }

    activateCompleteHook(): void {
        super.activateCompleteHook();

        let pagesModel: PagesModel = getInstance(PagesModel);
        pagesModel.addPageViewClass(GOWGamePageView, PageId.GAME_PAGE_ID);
    }
}