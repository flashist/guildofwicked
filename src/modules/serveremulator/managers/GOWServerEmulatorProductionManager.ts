import {BaseManager} from "../../../appframework/base/managers/BaseManager";
import {GOWServerEmulatorUsersManager} from "./GOWServerEmulatorUsersManager";
import {GOWServerEmulatorGeneratorsManager} from "./GOWServerEmulatorGeneratorsManager";
import {GenericObjectsByTypeModel, getInstance} from "@flashist/flibs";
import {IGOWServerEmulatorUserVO} from "../data/IGOWServerEmulatorUserVO";
import {IGOWServerEmulatorGeneratorVO} from "../data/IGOWServerEmulatorGeneratorVO";
import {IGOWGeneratorStaticVO} from "../../generators/data/IGOWGeneratorStaticVO";
import {GOWGeneratorStaticVOType} from "../../generators/data/GOWGeneratorStaticVOType";
import {GOWBonusType} from "../../upgrades/data/GOWBonusType";
import {GOWBonusTools} from "../../upgrades/tools/GOWBonusTools";
import {IGOWResourceVO} from "../../resources/data/IGOWResourceVO";
import {IGOWProductionResultVO} from "../../production/data/IGOWProductionResultVO";

export class GOWServerEmulatorProductionManager extends BaseManager {

    protected genericByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);
    protected emulatorUsersManager: GOWServerEmulatorUsersManager = getInstance(GOWServerEmulatorUsersManager);
    protected emulatorGeneratorsManager: GOWServerEmulatorGeneratorsManager = getInstance(GOWServerEmulatorGeneratorsManager);

    public calculateProductionForUser(userId: string): IGOWProductionResultVO {
        const result: IGOWProductionResultVO = {
            profitByGenerator: {},
            totalProfit: {}
        };

        const userData: IGOWServerEmulatorUserVO = this.emulatorUsersManager.getUserData(userId);
        if (userData) {

            const userGenerators: IGOWServerEmulatorGeneratorVO[] = this.emulatorGeneratorsManager.getUserGenerators(userData.id);
            for (let singleGenerator of userGenerators) {

                if (singleGenerator.isProductionInProgress) {
                    const staticSingleGenerator: IGOWGeneratorStaticVO = this.genericByTypeModel.getItem(
                        GOWGeneratorStaticVOType,
                        singleGenerator.id
                    );

                    const cumulativeBonusesData = GOWBonusTools.getCumulativeBonusesFromUgpradesData(singleGenerator.boughtUpgradeIds);

                    let completeCyclesCount: number = 0;
                    let timeForProductionCycles: number = Date.now() - singleGenerator.startProductionServerTime;

                    let durationBonus: number = 1;
                    if (cumulativeBonusesData[GOWBonusType.DURATION]) {
                        durationBonus = cumulativeBonusesData[GOWBonusType.DURATION];
                    }

                    let profitBonus: number = 1;
                    if (cumulativeBonusesData[GOWBonusType.PROFIT]) {
                        profitBonus = cumulativeBonusesData[GOWBonusType.PROFIT];
                    }

                    const cumulativeProductionValue: number = staticSingleGenerator.productionValue.value * profitBonus * singleGenerator.level;
                    const cumulativeProductionDuration: number = staticSingleGenerator.productionDuration / durationBonus;

                    const autoBonus: number = cumulativeBonusesData[GOWBonusType.AUTO];
                    while (timeForProductionCycles >= cumulativeProductionDuration) {
                        timeForProductionCycles -= cumulativeProductionDuration;
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
                            value: cumulativeProductionValue * completeCyclesCount
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
            this.emulatorUsersManager.changeUserResources(userId, [singleResource]);
        }

        return result;
    }

}