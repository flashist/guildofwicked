import {BaseDataVO} from "fsuite";
import {GOWUpgradeType} from "./GOWUpgradeType";
import {IGOWBonusVO} from "./IGOWBonusVO";
import {IGOWResourceVO} from "../../resources/data/IGOWResourceVO";

export interface IGOWUpgradeStaticVO extends BaseDataVO {
    upgradeType: GOWUpgradeType;
    bonus: IGOWBonusVO;
    generatorId?: string;

    localeId: string;
    price: IGOWResourceVO;
}