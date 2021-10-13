import {getInstance} from "@flashist/flibs";

import {GOWGamePageMoneyVisuzalizationView} from "./GOWGamePageMoneyVisuzalizationView";
import {GOWGamePageProductionTabId} from "../../../data/GOWGamePageProductionTabId";
import {GOWGamePageModel} from "../../../models/GOWGamePageModel";
import {GOWGamePageModelEvent} from "../../../events/GOWGamePageModelEvent";
import {ViewLazyCreationServiceLocatorStack} from "../../../../../appframework/display/views/viewstack/ViewLazyCreationServiceLocatorStack";
import {GOWGamePageUnitsVisuzalizationView} from "./GOWGamePageUnitsVisuzalizationView";
import {BaseView} from "../../../../../appframework/base/views/BaseView";

export class GOWGamePageVisualizationView extends BaseView {

    protected gamePageModel: GOWGamePageModel;

    protected tabsStack: ViewLazyCreationServiceLocatorStack;

    protected construction(...args): void {
        super.construction(...args);

        this.gamePageModel = getInstance(GOWGamePageModel);

        this.tabsStack = new ViewLazyCreationServiceLocatorStack();
        this.addChild(this.tabsStack);
        //
        this.tabsStack.addViewClass(GOWGamePageMoneyVisuzalizationView, GOWGamePageProductionTabId.MONEY);
        this.tabsStack.addViewClass(GOWGamePageUnitsVisuzalizationView, GOWGamePageProductionTabId.UNITS);
    }

    protected addListeners(): void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            this.gamePageModel,
            GOWGamePageModelEvent.PRODUCTION_TAB_ID_CHANGE,
            this.onTabIdChange
        )
    }

    protected onTabIdChange(): void {
        this.commitData();
    }

    protected commitData(): void {
        super.commitData();

        this.tabsStack.selectedId = this.gamePageModel.productionTabId;

        this.arrange();
    }

    protected arrange(): void {
        super.arrange();

        this.tabsStack.resize(this.resizeSize.x, this.resizeSize.y);
    }
}