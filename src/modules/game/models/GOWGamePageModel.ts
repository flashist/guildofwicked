import {BaseModel} from "../../../appframework/base/models/BaseModel";
import {GOWGamePageProductionTabId} from "../data/GOWGamePageProductionTabId";
import {GOWGamePageModelEvent} from "../events/GOWGamePageModelEvent";
import {GOWGamePageTabId} from "../data/GOWGamePageTabId";

export class GOWGamePageModel extends BaseModel {

    private _tabId: string = GOWGamePageTabId.CITY;
    get tabId(): string {
        return this._tabId;
    }
    set tabId(value: string) {
        if (value === this.tabId) {
            return;
        }

        this._tabId = value;

        this.dispatchEvent(GOWGamePageModelEvent.TAB_ID_CHANGE);
    }

    private _productionTabId: string = GOWGamePageProductionTabId.MONEY;
    get productionTabId(): string {
        return this._productionTabId;
    }
    set productionTabId(value: string) {
        if (value === this.productionTabId) {
            return;
        }

        this._productionTabId = value;

        this.dispatchEvent(GOWGamePageModelEvent.PRODUCTION_TAB_ID_CHANGE);
    }
}