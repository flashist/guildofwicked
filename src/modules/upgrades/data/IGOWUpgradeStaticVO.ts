import {BaseDataVO} from "fsuite";
import {GOWUpgradeType} from "./GOWUpgradeType";
import {IGOWResourceVO} from "../../resources/data/IGOWResourceVO";

export interface IGOWUpgradeStaticVO extends BaseDataVO {
    upgradeType: GOWUpgradeType;
    bonusId: string;
    generatorId?: string;

    localeId: string;
    price: IGOWResourceVO;
}