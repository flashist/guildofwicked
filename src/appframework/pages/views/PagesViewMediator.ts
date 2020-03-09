import {getInstance} from "fsuite";

import {BaseMediator} from "../../base/mediators/BaseMediator";
import {PagesView} from "./PagesView";
import {PagesModelEvent} from "../models/PagesModelEvent";
import {PagesModel} from "../models/PagesModel";

export class PagesViewMediator extends BaseMediator {
    protected activator: PagesView;
    protected pagesModel: PagesModel = getInstance(PagesModel);

    onActivatorStart(activator: any): void {
        super.onActivatorStart(activator);

        let pageIdToViewClassMap = this.pagesModel.getPageIdToViewClassMap();
        let pageIds: string[] = pageIdToViewClassMap.getAllKeys();
        let pageIdsCount: number = pageIds.length;
        for (let pageIdIndex: number = 0; pageIdIndex < pageIdsCount; pageIdIndex++) {
            let tempPageClass = pageIdToViewClassMap.getItemByIndex(pageIdIndex);
            let tempPageId: string = pageIds[pageIdIndex];

            this.activator.viewStack.addViewClass(tempPageClass, tempPageId);
        }

        this.eventListenerHelper.addEventListener(
            this.globalDispatcher,
            PagesModelEvent.PAGE_ID_CHANGE,
            this.onPageIdChange
        );

        //
        this.commitPagesData();
    }

    protected onPageIdChange(): void {
        this.commitPagesData();
    }

    protected commitPagesData(): void {
        this.activator.viewStack.selectedId = this.pagesModel.pageId;
    }
}