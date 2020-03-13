import {BaseManager} from "../../../appframework/base/managers/BaseManager";
import {GOWServerEmulatorUsersManager} from "./GOWServerEmulatorUsersManager";
import {GOWServerEmulatorGeneratorsManager} from "./GOWServerEmulatorGeneratorsManager";
import {GenericObjectsByTypeModel, getInstance} from "fsuite";
import {IGOWServerEmulatorUserVO} from "../data/IGOWServerEmulatorUserVO";
import {IGOWServerEmulatorGeneratorVO} from "../data/IGOWServerEmulatorGeneratorVO";
import {IGOWGeneratorStaticVO} from "../../generators/data/IGOWGeneratorStaticVO";
import {GOWGeneratorVOStaticType} from "../../generators/data/GOWGeneratorVOStaticType";
import {GOWBonusType} from "../../upgrades/data/GOWBonusType";
import {GOWBonusTools} from "../../upgrades/tools/GOWBonusTools";
import {IGOWResourceVO} from "../../resources/data/IGOWResourceVO";
import {IGOWProductionResultVO} from "../../production/data/IGOWProductionResultVO";

export class GOWServerEmulatorProductionManager extends BaseManager {

    protected emulatorUsersManager: GOWServerEmulatorUsersManager;
    protected emulatorGeneratorsManager: GOWServerEmulatorGeneratorsManager;

    protected construction(...args): void {
        super.construction(...args);

        this.emulatorUsersManager = getInstance(GOWServerEmulatorUsersManager);
        this.emulatorGeneratorsManager = getInstance(GOWServerEmulatorGeneratorsManager);
    }

    public calculateProductionForUser(userId: string): IGOWProductionResultVO {
        const result: IGOWProductionResultVO = {
            profitByGenerator: {},
            totalProfit: {}
        };

        const userData: IGOWServerEmulatorUserVO = this.emulatorUsersManager.getUserData(userId);
        if (userData) {

            const genericByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);

            const userGenerators: IGOWServerEmulatorGeneratorVO[] = this.emulatorGeneratorsManager.getUserGenerators(userData.id);
            for (let singleGenerator of userGenerators) {

                if (singleGenerator.isProductionInProgress) {
                    const staticSingleGenerator: IGOWGeneratorStaticVO = genericByTypeModel.getItem(
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
                        timeForProductionCycles -= durationWithBonuses;
                        completeCyclesCount++;

                        // If there is no auto bonus, then multiple cycles can't be generated
                        if (!autoBonus) {
                            break;
                        }
                    }

                    if (completeCyclesCount > 0) {
                        if (autoBonus) {
                            // Start production again and take into account time left unesed from complete cycles
                            this.emulatorGeneratorsManager.startProduction(
                                userId,
                                singleGenerator.id,
                                Date.now() - timeForProductionCycles
                            );

                        } else {
                            this.emulatorGeneratorsManager.stopProduction(userId, singleGenerator.id);
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

        return result;
    }

}