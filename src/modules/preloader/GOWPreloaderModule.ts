import {getInstance, serviceLocatorAdd} from "@flashist/flibs";

import {BaseModule} from "../../appframework/base/modules/BaseModule";
import {PagesModel} from "../../appframework/pages/models/PagesModel";
import {PageId} from "../../appframework/pages/PageId";
import {GOWPreloaderPageMediator} from "./views/GOWPreloaderPageMediator";
import {GOWPreloaderPageView} from "./views/GOWPreloaderPageView";

export class GOWPreloaderModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(GOWPreloaderPageView, {activateeConstructors: [GOWPreloaderPageMediator]});
    }

    activateCompleteHook(): void {
        super.activateCompleteHook();

        let pagesModel: PagesModel = getInstance(PagesModel);
        pagesModel.addPageViewClass(GOWPreloaderPageView, PageId.PRELOADER_PAGE_ID);
    }
}