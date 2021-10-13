import {GenericObjectsByTypeModel, getInstance} from "@flashist/flibs";

import {BaseManager} from "../../../appframework/base/managers/BaseManager";
import {TimeModel} from "../../../appframework/time/models/TimeModel";
import {TimeModelEvent} from "../../../appframework/time/models/TimeModelEvent";
import {IGOWProductionResultVO} from "../data/IGOWProductionResultVO";
import {IGOWGeneratorStaticVO} from "../../generators/data/IGOWGeneratorStaticVO";
import {GOWGeneratorStaticVOType} from "../../generators/data/GOWGeneratorStaticVOType";
import {GOWBonusTools} from "../../upgrades/tools/GOWBonusTools";
import {GOWBonusType} from "../../upgrades/data/GOWBonusType";
import {IGOWResourceVO} from "../../resources/data/IGOWResourceVO";
import {GOWUsersModel} from "../../users/models/GOWUsersModel";
import {GOWGeneratorsModel} from "../../generators/models/GOWGeneratorsModel";
import {GOWUserVO} from "../../users/data/GOWUserVO";
import {GOWGeneratorVO} from "../../generators/data/GOWGeneratorVO";
import {GOWGeneratorChangeStartProductionTimeClientCommand} from "../../generators/commands/GOWGeneratorChangeStartProductionTimeClientCommand";
import {GOWGeneratorStopProductionClientCommand} from "../../generators/commands/GOWGeneratorStopProductionClientCommand";
import {GOWChangeUserResourcesClientCommand} from "../../users/command/GOWChangeUserResourcesClientCommand";
import {GOWCalculateProductionServerRequestCommand} from "../../generators/commands/GOWCalculateProductionServerRequestCommand";
import {GOWUpgradeStaticVOType} from "../../upgrades/data/GOWUpgradeStaticVOType";
import {IGOWUpgradeStaticVO} from "../../upgrades/data/IGOWUpgradeStaticVO";

export class GOWProductionManager extends BaseManager {

    protected timeModel: TimeModel = getInstance(TimeModel);
    protected usersModel: GOWUsersModel = getInstance(GOWUsersModel);
    protected generatorsModel: GOWGeneratorsModel = getInstance(GOWGeneratorsModel);
    protected genericByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);

    public isActive: boolean = false;

    protected addListeners(): void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            this.globalDispatcher,
            TimeModelEvent.TIME_DATA_CHANGE,
            this.onTimeChange
        );
    }

    protected onTimeChange(): void {
        this.processProductionTick();
    }

    protected processProductionTick(): void {
        if (!this.isActive) {
            return;
        }

        this.calculateProductionForUser(this.usersModel.curUserId);
    }

    public calculateProductionForUser(userId: string): void {
        const result: IGOWProductionResultVO = {
            profitByGenerator: {},
            totalProfit: {}
        };

        let isAnyProductionCycleComplete: boolean;

        const userData: GOWUserVO = this.usersModel.getItem(userId);
        if (userData) {

            const userGenerators: GOWGeneratorVO[] = this.generatorsModel.getAllItems();
            for (let singleGenerator of userGenerators) {

                if (singleGenerator.isProductionInProgress) {
                    const staticSingleGenerator: IGOWGeneratorStaticVO = this.genericByTypeModel.getItem(
                        GOWGeneratorStaticVOType,
                        singleGenerator.id
                    );

                    const cumulativeBonusesData = GOWBonusTools.getCumulativeBonusesFromUgpradesData(singleGenerator.boughtUpgradeIds);

                    let completeCyclesCount: number = 0;
                    let timeForProductionCycles: number = Date.now() - singleGenerator.startProductionServerTime;

                    const autoBonus: number = cumulativeBonusesData[GOWBonusType.AUTO];
                    const durationWithBonuses: number = singleGenerator.cumulativeProductionDuration;
                    while (timeForProductionCycles >= durationWithBonuses) {
                        isAnyProductionCycleComplete = true;

                        timeForProductionCycles -= durationWithBonuses;
                        completeCyclesCount++;

                        // If there is no auto bonus, then multiple cycles can't be generated
                        if (!autoBonus) {
                            break;
                        }
                    }

                    if (completeCyclesCount > 0) {
                        if (autoBonus) {
                            new GOWGeneratorChangeStartProductionTimeClientCommand(
                                singleGenerator.id,
                                Date.now()
                            ).execute();

                        } else {
                            new GOWGeneratorStopProductionClientCommand(singleGenerator.id)
                                .execute();
                        }

                        const profit: IGOWResourceVO = {
                            type: staticSingleGenerator.productionValue.type,
                            value: singleGenerator.cumulativeProductionValue.value * completeCyclesCount
                        };

                        result.profitByGenerator[singleGenerator.id] = profit;

                        if (!result.totalProfit[profit.type]) {
                            result.totalProfit[profit.type] = {
                                type: profit.type,
                                value: 0
                            };
                        }
                        result.totalProfit[profit.type].value += profit.value
                    }
                }

            }
        }

        let resourceKeys: string[] = Object.keys(result.totalProfit);
        for (let singleResourceId of resourceKeys) {
            const singleResource: IGOWResourceVO = result.totalProfit[singleResourceId];

            new GOWChangeUserResourcesClientCommand(userData.id, [singleResource])
                .execute();
        }

        if (isAnyProductionCycleComplete) {
            new GOWCalculateProductionServerRequestCommand()
                .execute();
        }
    }
}