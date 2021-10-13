import {getInstance} from "@flashist/flibs";

import {BaseManager} from "../../../appframework/base/managers/BaseManager";
import {StorageManager} from "../../../appframework/storage/managers/StorageManager";
import {GOWEmulatorSettings} from "../GOWEmulatorSettings";
import {IGOWServerEmulatorGeneratorVO} from "../data/IGOWServerEmulatorGeneratorVO";
import {GOWGeneratorVOType} from "../../generators/data/GOWGeneratorVOType";

export class GOWServerEmulatorGeneratorsManager extends BaseManager {
    protected storageManager: StorageManager;

    protected userIdToActiveGeneratorsMap: {
        [userId: string]: IGOWServerEmulatorGeneratorVO[]
    };

    protected construction(...args): void {
        super.construction(...args);

        this.storageManager = getInstance(StorageManager);

        this.readData();
    }

    protected saveData(): void {
        const textData: string = JSON.stringify(this.userIdToActiveGeneratorsMap);
        this.storageManager.setParam(GOWEmulatorSettings.generators.storageId, textData);
    }

    protected readData(): void {
        const textData: string = this.storageManager.getParam(GOWEmulatorSettings.generators.storageId);
        if (textData) {
            this.userIdToActiveGeneratorsMap = JSON.parse(textData);
        } else {
            this.userIdToActiveGeneratorsMap = {};
        }
    }

    public getUserGenerators(userId: string): IGOWServerEmulatorGeneratorVO[] {
        let result = this.userIdToActiveGeneratorsMap[userId];
        if (!result) {
            result = [];
            this.userIdToActiveGeneratorsMap[userId] = result;
        }

        return result;
    }

    public getUserSingleGenerator(userId: string, generatorId: string): IGOWServerEmulatorGeneratorVO {
        let result: IGOWServerEmulatorGeneratorVO;

        let userGenerators: IGOWServerEmulatorGeneratorVO[] = this.getUserGenerators(userId);
        if (userGenerators) {
            for (let singleGenerator of userGenerators) {
                if (singleGenerator.id === generatorId) {
                    result = singleGenerator;
                    break;
                }
            }
        }

        return result;
    }

    public buyGeneratorForUser(userId: string, generatorId: string): void {
        let generatorData: IGOWServerEmulatorGeneratorVO= this.getUserSingleGenerator(userId, generatorId);
        if (!generatorData) {
            generatorData = {
                id: generatorId,
                type: GOWGeneratorVOType,

                level: 0,
                startProductionServerTime: 0,
                isProductionInProgress: false,
                boughtUpgradeIds: []
            };

            const userGenerators: IGOWServerEmulatorGeneratorVO[] = this.getUserGenerators(userId);
            userGenerators.push(generatorData);
        }

        generatorData.level++;

        this.saveData();
    }

    public startProduction(userId: string, generatorId: string, startTime: number): void {
        const generatorData: IGOWServerEmulatorGeneratorVO = this.getUserSingleGenerator(userId, generatorId);

        generatorData.isProductionInProgress = true;
        generatorData.startProductionServerTime = startTime;

        this.saveData();
    }

    public stopProduction(userId: string, generatorId: string): void {
        const generatorData: IGOWServerEmulatorGeneratorVO = this.getUserSingleGenerator(userId, generatorId);
        if (!generatorData.isProductionInProgress) {
            return;
        }

        generatorData.isProductionInProgress = false;

        this.saveData();
    }

    public addGeneratorUpgrade(userId: string, generatorId: string, upgradeId: string): void {
        const generatorData: IGOWServerEmulatorGeneratorVO = this.getUserSingleGenerator(userId, generatorId);
        if (generatorData.boughtUpgradeIds.indexOf(upgradeId) !== -1) {
            return;
        }

        generatorData.boughtUpgradeIds.push(upgradeId);

        this.saveData();
    }
}