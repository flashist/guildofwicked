import {BaseModel} from "../../../appframework/base/models/BaseModel";
import {GOWGamePageTabId} from "../data/GOWGamePageTabId";
import {GOWGamePageModelEvent} from "../events/GOWGamePageModelEvent";

export class GOWGamePageModel extends BaseModel {

    private _tabId: string = GOWGamePageTabId.MONEY;

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
}