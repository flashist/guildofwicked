import {getInstance} from "fsuite";

import {BaseManager} from "../../../appframework/base/managers/BaseManager";
import {StorageManager} from "../../../appframework/storage/managers/StorageManager";
import {GOWEmulatorSettings} from "../GOWEmulatorSettings";
import {GOWUserVOType} from "../../users/data/GOWUserVOType";
import {IGOWServerEmulatorGeneratorVO} from "../data/IGOWServerEmulatorGeneratorVO";
import {GOWGeneratorVOType} from "../../generators/data/GOWGeneratorVOType";

export class GOWServerEmulatorGeneratorsManager extends BaseManager {
    protected storageManager: StorageManager;

    protected userIdToActiveGeneratorsMap: {
        [userId: string]: {
            [generatorId: string]: IGOWServerEmulatorGeneratorVO
        }
    };

    protected construction(...args): void {
        super.construction(...args);

        this.storageManager = getInstance(StorageManager);
        this.userIdToActiveGeneratorsMap = this.storageManager.getParam(GOWEmulatorSettings.generators.storageId);
        if (!this.userIdToActiveGeneratorsMap) {
            this.userIdToActiveGeneratorsMap = {};
        }
    }

    protected saveData(): void {
        this.storageManager.setParam(GOWEmulatorSettings.generators.storageId, this.userIdToActiveGeneratorsMap);
    }

    public getUserGenerators(userId: string): {[generatorId: string]: IGOWServerEmulatorGeneratorVO} {
        let result = this.userIdToActiveGeneratorsMap[userId];
        if (!result) {
            result = {};
            this.userIdToActiveGeneratorsMap[userId] = result;
        }

        return result;
    }

    public getUserSingleGenerator(userId: string, generatorId: string): IGOWServerEmulatorGeneratorVO {
        let userGenerators = this.getUserGenerators(userId);
        let generatorData: IGOWServerEmulatorGeneratorVO = userGenerators[generatorId];
        return generatorData;
    }

    public buyGeneratorForUser(userId: string, generatorId: string): void {
        let userGenerators = this.getUserGenerators(userId);
        let generatorData: IGOWServerEmulatorGeneratorVO = userGenerators[generatorId];
        if (!generatorData) {
            generatorData = {
                id: generatorId,
                type: GOWGeneratorVOType,

                level: 0,
                startProductionTime: 0,
                isProductionInProgress: false
            };
            userGenerators[generatorId] = generatorData;
        }

        generatorData.level++;

        this.saveData();
    }

    public startProduction(userId: string, generatorId: string): void {
        const generatorData: IGOWServerEmulatorGeneratorVO = this.getUserSingleGenerator(userId, generatorId);
        if (generatorData.isProductionInProgress) {
            return;
        }

        generatorData.isProductionInProgress = true;
        generatorData.startProductionTime = Date.now();
    }
}