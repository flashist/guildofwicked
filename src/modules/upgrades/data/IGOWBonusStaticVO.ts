import {GOWBonusType} from "./GOWBonusType";
import {IGenericObjectVO} from "fsuite";

export interface IGOWBonusStaticVO extends IGenericObjectVO {
    bonusType: GOWBonusType;
    bonusValue?: number;
    localeId: string;
}