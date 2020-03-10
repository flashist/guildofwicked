import {BaseDataVO} from "fcore";
import {GOWUserVOEvent} from "../events/GOWUserVOEvent";

export class GOWUserVO extends BaseDataVO {

    private _money: number = 0;

    get money(): number {
        return this._money;
    }
    set money(value: number) {
        if (value === this.money) {
            return;
        }

        this._money = value;

        this.dispatchEvent(GOWUserVOEvent.MONEY_CHANGE);
    }

}