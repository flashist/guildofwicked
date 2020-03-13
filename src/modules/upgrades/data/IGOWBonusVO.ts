import {GOWBonusType} from "./GOWBonusType";

export interface IGOWBonusVO {
    type: GOWBonusType;
    value?: number;
}