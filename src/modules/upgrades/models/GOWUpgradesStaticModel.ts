import {IGenericObjectVO} from "@flashist/flibs";

import {BaseModel} from "../../../appframework/base/models/BaseModel";
import {IGOWUpgradeStaticVO} from "../data/IGOWUpgradeStaticVO";
import {IGOWSingleGeneratorUpgradesPreparedVO} from "../data/IGOWSingleGeneratorUpgradesPreparedVO";
import {GOWUpgradeType} from "../data/GOWUpgradeType";
import {GOWUpgradeStaticVOType} from "../data/GOWUpgradeStaticVOType";

export class GOWUpgradesStaticModel extends BaseModel<IGOWUpgradeStaticVO> {

    protected generatorIdToUpgradesMap: {[generatorId: string]: IGOWSingleGeneratorUpgradesPreparedVO} = {};

    constructor() {
        super();

        this.itemsType = GOWUpgradeStaticVOType;
    }

    parseSource(source: IGenericObjectVO): void {
        super.parseSource(source);

        // Prepare data for further usage
        const item: IGOWUpgradeStaticVO = this.getItem(source.id);
        if (item.generatorId) {
            const generatorData = this.getGeneratorData(item.generatorId);
            if (generatorData.all.indexOf(item) === -1) {
                generatorData.all.push(item);

                const generatorUpgradesOfType: IGOWUpgradeStaticVO[] = this.getGeneratorUpgrades(item.generatorId, item.upgradeType);
                generatorUpgradesOfType.push(item);
            }
        }
    }

    protected getGeneratorData(generatorId: string): IGOWSingleGeneratorUpgradesPreparedVO {
        let result: IGOWSingleGeneratorUpgradesPreparedVO = this.generatorIdToUpgradesMap[generatorId];
        if (!result) {
            result = {
                all: []
            };
            this.generatorIdToUpgradesMap[generatorId] = result;
        }

        return result;
    }

    public getGeneratorUpgrades(generatorId: string, upgradeType?: GOWUpgradeType): IGOWUpgradeStaticVO[] {
        let result: IGOWUpgradeStaticVO[] = [];

        const generatorData: IGOWSingleGeneratorUpgradesPreparedVO = this.getGeneratorData(generatorId);
        if (upgradeType) {
            if (!generatorData[upgradeType]) {
                generatorData[upgradeType] = [];
            }
            result = generatorData[upgradeType];

        } else {
            result = generatorData.all;
        }

        return result;
    }
}