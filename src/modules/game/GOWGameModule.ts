import {getInstance, serviceLocatorAdd} from "fsuite";

import {BaseModule} from "../../appframework/base/modules/BaseModule";
import {PagesModel} from "../../appframework/pages/models/PagesModel";
import {PageId} from "../../appframework/pages/PageId";
import {GOWGamePageView} from "./views/GOWGamePageView";
import {GOWGamePageModel} from "./models/GOWGamePageModel";
import {GOWGamePageFooterView} from "./views/footer/GOWGamePageFooterView";
import {GOWGamePageFooterMediator} from "./views/footer/GOWGamePageFooterMediator";
import {GOWGeneratorProductionItemRendererView} from "./views/city/production/list/GOWGeneratorProductionItemRendererView";
import {GOWGeneratorProductionManagersView} from "./views/city/production/list/managers/GOWGeneratorProductionManagersView";
import {GOWGamePageProductionView} from "./views/city/production/GOWGamePageProductionView";
import {GOWGamePageProductionMediator} from "./views/city/production/GOWGamePageProductionMediator";
import {GOWGeneratorProductionManagersMediator} from "./views/city/production/list/managers/GOWGeneratorProductionManagersMediator";
import {GOWGeneratorProductionItemRendererMediator} from "./views/city/production/list/GOWGeneratorProductionItemRendererMediator";

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