import {BaseDataVO} from "@flashist/flibs";
import {GOWUpgradeType} from "./GOWUpgradeType";
import {IGOWResourceVO} from "../../resources/data/IGOWResourceVO";

export interface IGOWUpgradeStaticVO extends BaseDataVO {
    upgradeType: GOWUpgradeType;
    price: IGOWResourceVO;

    bonusId: string;
    generatorId?: string;
}