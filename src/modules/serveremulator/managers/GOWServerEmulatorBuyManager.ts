import {GenericObjectsByTypeModel, getInstance} from "fsuite";

import {BaseManager} from "../../../appframework/base/managers/BaseManager";
import {GOWUpgradeStaticVOType} from "../../upgrades/data/GOWUpgradeStaticVOType";
import {IGOWUpgradeStaticVO} from "../../upgrades/data/IGOWUpgradeStaticVO";
import {IGOWBonusStaticVO} from "../../upgrades/data/IGOWBonusStaticVO";
import {GOWBonusStaticVOType} from "../../upgrades/data/GOWBonusStaticVOType";
import {GOWBonusType} from "../../upgrades/data/GOWBonusType";
import {GOWGeneratorStartProductionClientCommand} from "../../generators/commands/GOWGeneratorStartProductionClientCommand";
import {GOWGeneralBuyServerRequestCommand} from "../../server/commands/GOWGeneralBuyServerRequestCommand";
import {GOWServerEmulatorGeneratorsManager} from "./GOWServerEmulatorGeneratorsManager";
import {IGOWServerEmulatorGeneratorVO} from "../data/IGOWServerEmulatorGeneratorVO";
import {IServerResponseVO} from "../../../appframework/server/data/IServerResponseVO";
import {GOWServerErrorCode} from "../data/GOWServerErrorCode";
import {GOWGeneratorVOType} from "../../generators/data/GOWGeneratorVOType";
import {GOWServerEmulatorResourcesTools} from "../tools/GOWServerEmulatorResourcesTools";
import {GOWServerEmulatorUsersManager} from "./GOWServerEmulatorUsersManager";
import {IGOWServerEmulatorUserVO} from "../data/IGOWServerEmulatorUserVO";
import {GOWGeneratorsTools} from "../../generators/tools/GOWGeneratorsTools";
import {IGOWGeneratorStaticVO} from "../../generators/data/IGOWGeneratorStaticVO";
import {GOWGeneratorStaticVOType} from "../../generators/data/GOWGeneratorStaticVOType";
import {IGOWResourceVO} from "../../resources/data/IGOWResourceVO";

export class GOWServerEmulatorBuyManager extends BaseManager {

    protected genericByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);
    protected generatorsManager: GOWServerEmulatorGeneratorsManager = getInstance(GOWServerEmulatorGeneratorsManager);
    protected usersManager: GOWServerEmulatorUsersManager = getInstance(GOWServerEmulatorUsersManager);

    async processGeneralBuy(userId: string, objectType: string, objectId: string): Promise<Partial<IServerResponseVO>> {
        let result: Promise<Partial<IServerResponseVO>>;

        switch (objectType) {
            case GOWUpgradeStaticVOType:
                result = this.processUpgradeBuy(userId, objectId);
                break;

            case GOWGeneratorVOType:
                result = this.processGeneratorBuy(userId, objectId);
                break;

            default:
                result = Promise.resolve(
                    {
                        errorCode: GOWServerErrorCode.OBJECT_NOT_FOUND,
                        errorMessage: `objectType: ${objectType}, objectId: ${objectId}`
                    } as Partial<IServerResponseVO>
                );
                break;
        }

        return result;
    }

    protected async processGeneratorBuy(userId: string, generatorId: string): Promise<Partial<IServerResponseVO>> {
        let result: Partial<IServerResponseVO> = {};

        const generatorData: IGOWServerEmulatorGeneratorVO = this.generatorsManager.getUserSingleGenerator(
            userId,
            generatorId
        );
        let curGeneratorLevel: number = 0;
        if (generatorData) {
            curGeneratorLevel = generatorData.level;
        }

        const staticGeneratorData: IGOWGeneratorStaticVO = this.genericByTypeModel.getItem(
            GOWGeneratorStaticVOType,
            generatorId
        );
        const priceResource: IGOWResourceVO = {
            type: staticGeneratorData.basePrice.type,
            value: GOWGeneratorsTools.calculateNextLevelPrice(
                staticGeneratorData.basePrice.value,
                curGeneratorLevel,
                staticGeneratorData.buyCoef
            )
        };

        if (GOWServerEmulatorResourcesTools.checkIfEnoughResources(userId, [priceResource])) {
            this.usersManager.changeUserResources(
                userId,
                [
                    {
                        type: priceResource.type,
                        value: -1 * priceResource.value
                    }
                ]
            );

            this.generatorsManager.buyGeneratorForUser(
                userId,
                generatorId
            );

        } else {
            result.errorCode = GOWServerErrorCode.NOT_ENOUGH_RESOURCES;
        }

        return result;
    }

    protected async processUpgradeBuy(userId: string, upgradeId: string): Promise<Partial<IServerResponseVO>> {

        let result: Partial<IServerResponseVO> = {};

        const upgradeData: IGOWUpgradeStaticVO = this.genericByTypeModel.getItem(GOWUpgradeStaticVOType, upgradeId);

        const generatorData: IGOWServerEmulatorGeneratorVO = this.generatorsManager.getUserSingleGenerator(
            userId,
            upgradeData.generatorId
        );
        if (generatorData) {
            if (generatorData.boughtUpgradeIds.indexOf(upgradeId) === -1) {

                if (GOWServerEmulatorResourcesTools.checkIfEnoughResources(userId, [upgradeData.price])) {
                    this.usersManager.changeUserResources(
                        userId,
                        [
                            {
                                type: upgradeData.price.type,
                                value: -1 * upgradeData.price.value
                            }
                        ]
                    );


                    this.generatorsManager.addGeneratorUpgrade(userId, upgradeData.generatorId, generatorData.id);

                    const bonusData: IGOWBonusStaticVO = this.genericByTypeModel.getItem(
                        GOWBonusStaticVOType,
                        upgradeData.bonusId
                    );

                    // If it's an auto bonus, then start production for the building
                    if (bonusData.bonusType === GOWBonusType.AUTO) {
                        if (!generatorData.isProductionInProgress) {
                            this.generatorsManager.startProduction(
                                userId,
                                generatorData.id,
                                Date.now()
                            );
                        }
                    }

                } else {
                    result.errorCode = GOWServerErrorCode.NOT_ENOUGH_RESOURCES;
                }

            } else {
                result.errorCode = GOWServerErrorCode.GENERAL_ERROR;
                result.errorMessage = `Upgrade already bought!`;
            }

        } else {
            result.errorCode = GOWServerErrorCode.OBJECT_NOT_FOUND;
            result.errorMessage = `objectType: ${GOWGeneratorVOType}, objectId: ${upgradeData.generatorId}`;
        }

        return result;
    }
}