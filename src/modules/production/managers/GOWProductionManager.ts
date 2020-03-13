import {GenericObjectsByTypeModel, getInstance} from "fsuite";

import {BaseManager} from "../../../appframework/base/managers/BaseManager";
import {TimeModel} from "../../../appframework/time/models/TimeModel";
import {TimeModelEvent} from "../../../appframework/time/models/TimeModelEvent";
import {IGOWProductionResultVO} from "../data/IGOWProductionResultVO";
import {IGOWGeneratorStaticVO} from "../../generators/data/IGOWGeneratorStaticVO";
import {GOWGeneratorVOStaticType} from "../../generators/data/GOWGeneratorVOStaticType";
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

    public calculateProductionForUser(userId: string): IGOWProductionResultVO {
        const result: IGOWProductionResultVO = {
            profitByGenerator: {},
            totalProfit: {}
        };

        const userData: GOWUserVO = this.usersModel.getItem(userId);
        if (userData) {

            const userGenerators: GOWGeneratorVO[] = this.generatorsModel.getAllItems();
            for (let singleGenerator of userGenerators) {

                if (singleGenerator.isProductionInProgress) {
                    const staticSingleGenerator: IGOWGeneratorStaticVO = this.genericByTypeModel.getItem(
                        GOWGeneratorVOStaticType,
                        singleGenerator.id
                    );

                    const cumulativeBonusesData = GOWBonusTools.getCumulativeBonusesData(singleGenerator.bonusIds);

                    let completeCyclesCount: number = 0;
                    let timeForProductionCycles: number = Date.now() - singleGenerator.startProductionServerTime;

                    let durationBonus: number = cumulativeBonusesData[GOWBonusType.DURATION];
                    if (!durationBonus) {
                        durationBonus = 1;
                    }

                    const autoBonus: number = cumulativeBonusesData[GOWBonusType.AUTO];
                    const durationWithBonuses: number = staticSingleGenerator.productionDuration * durationBonus;
                    while (timeForProductionCycles >= durationWithBonuses) {
                        console.log("calculateProductionForUser __ complete __ time: ", Date.now());

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
                            value: staticSingleGenerator.productionValue.value * completeCyclesCount
                        };

                        const profitBonus: number = cumulativeBonusesData[GOWBonusType.PROFIT];
                        if (profitBonus) {
                            profit.value *= profitBonus;
                        }

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


        return result;
    }
}