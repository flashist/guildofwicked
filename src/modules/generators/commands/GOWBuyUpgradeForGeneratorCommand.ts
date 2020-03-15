import {GenericObjectsByTypeModel, getInstance} from "fsuite";

import {BaseSpendResourcesWithCheckCommand} from "../../resources/commands/BaseSpendResourcesWithCheckCommand";
import {IGOWResourceVO} from "../../resources/data/IGOWResourceVO";
import {GOWUpgradeStaticVOType} from "../../upgrades/data/GOWUpgradeStaticVOType";
import {IGOWUpgradeStaticVO} from "../../upgrades/data/IGOWUpgradeStaticVO";
import {GOWGeneratorVO} from "../data/GOWGeneratorVO";
import {GOWGeneratorVOType} from "../data/GOWGeneratorVOType";
import {GOWGeneratorStartProductionClientCommand} from "./GOWGeneratorStartProductionClientCommand";
import {IGOWBonusStaticVO} from "../../upgrades/data/IGOWBonusStaticVO";
import {GOWBonusStaticVOType} from "../../upgrades/data/GOWBonusStaticVOType";
import {GOWBonusType} from "../../upgrades/data/GOWBonusType";
import {GOWGeneralBuyServerRequestCommand} from "../../server/commands/GOWGeneralBuyServerRequestCommand";

export class GOWBuyUpgradeForGeneratorCommand extends BaseSpendResourcesWithCheckCommand {

    protected genericByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);

    protected upgradeData: IGOWUpgradeStaticVO;

    constructor(protected upgradeId: string) {
        super();

        this.upgradeData = this.genericByTypeModel.getItem(GOWUpgradeStaticVOType, this.upgradeId);
    }

    protected get resourcesToSpend(): IGOWResourceVO[] {
        return [this.upgradeData.price];
    }

    protected enoughResourcesExecute(): void {
        const promises: Promise<any>[] = [];

        const generatorData: GOWGeneratorVO = this.genericByTypeModel.getItem(
            GOWGeneratorVOType,
            this.upgradeData.generatorId
        );

        if (generatorData) {
            if (generatorData.boughtUpgradeIds.indexOf(this.upgradeId) === -1) {
                // Fake change data locally (for better user experience)
                generatorData.update(
                    {
                        boughtUpgradeIds: generatorData.boughtUpgradeIds.concat(this.upgradeId)
                    }
                );

                const bonusData: IGOWBonusStaticVO = this.genericByTypeModel.getItem(
                    GOWBonusStaticVOType,
                    this.upgradeData.bonusId
                );

                // If it's an auto bonus, then start production for the building
                if (bonusData.bonusType === GOWBonusType.AUTO) {
                    if (!generatorData.isProductionInProgress) {
                        const tempStartProdCmd: GOWGeneratorStartProductionClientCommand = new GOWGeneratorStartProductionClientCommand(generatorData.id, false);
                        promises.push(
                            tempStartProdCmd.execute()
                        );
                    }
                }
            }

            const tempServerCmd: GOWGeneralBuyServerRequestCommand = new GOWGeneralBuyServerRequestCommand(this.upgradeData.type, this.upgradeData.id);
            promises.push(
                tempServerCmd.execute()
            );
        }

        Promise.all(promises)
            .then(
                () => {
                    this.notifyComplete();
                }
            )
    }

}