import {IGOWUpgradeStaticVO} from "./IGOWUpgradeStaticVO";

export interface IGOWSingleGeneratorUpgradesPreparedVO {
    all: IGOWUpgradeStaticVO[];

    [upgradeType: string]: IGOWUpgradeStaticVO[];
}