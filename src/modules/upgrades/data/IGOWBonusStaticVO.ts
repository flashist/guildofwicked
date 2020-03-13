import {GOWBonusType} from "./GOWBonusType";
import {IGenericObjectVO} from "fsuite";

export interface IGOWBonusStaticVO extends IGenericObjectVO {
    type: GOWBonusType;
    value?: number;
}