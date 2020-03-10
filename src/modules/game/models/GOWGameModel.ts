import {BaseModel} from "../../../appframework/base/models/BaseModel";
import {GOWGamePageTabId} from "../data/GOWGamePageTabId";
import {GOWGameModelEvent} from "../events/GOWGameModelEvent";

export class GOWGameModel extends BaseModel {

    private _tabId: GOWGamePageTabId;

    get tabId(): GOWGamePageTabId {
        return this._tabId;
    }
    set tabId(value: GOWGamePageTabId) {
        if (value === this.tabId) {
            return;
        }

        this._tabId = value;

        this.dispatchEvent(GOWGameModelEvent.TAB_ID_CHANGE);
    }
}