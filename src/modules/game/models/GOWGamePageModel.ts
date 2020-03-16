import {BaseModel} from "../../../appframework/base/models/BaseModel";
import {GOWGamePageProductionTabId} from "../data/GOWGamePageProductionTabId";
import {GOWGamePageModelEvent} from "../events/GOWGamePageModelEvent";

export class GOWGamePageModel extends BaseModel {

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