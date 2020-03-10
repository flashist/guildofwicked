import {BaseModel} from "../../../appframework/base/models/BaseModel";
import {GOWGamePageTabId} from "../data/GOWGamePageTabId";
import {GOWGamePageModelEvent} from "../events/GOWGamePageModelEvent";

export class GOWGamePageModel extends BaseModel {

    private _tabId: GOWGamePageTabId = GOWGamePageTabId.MONEY;

    get tabId(): GOWGamePageTabId {
        return this._tabId;
    }
    set tabId(value: GOWGamePageTabId) {
        if (value === this.tabId) {
            return;
        }

        this._tabId = value;

        this.dispatchEvent(GOWGamePageModelEvent.TAB_ID_CHANGE);
    }
}