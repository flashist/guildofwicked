import {GOWBonusType} from "./GOWBonusType";
import {IGenericObjectVO} from "@flashist/flibs";

export interface IGOWBonusStaticVO extends IGenericObjectVO {
    bonusType: GOWBonusType;
    bonusValue?: number;
    localeId: string;
}