import {UniqueTools} from "fcore";
import {getInstance} from "fsuite";

import {BaseManager} from "../../../appframework/base/managers/BaseManager";
import {StorageManager} from "../../../appframework/storage/managers/StorageManager";
import {IGOWEmulationUserVO} from "../data/IGOWEmulationUserVO";
import {GOWEmulatorSettings} from "../GOWEmulatorSettings";

export class GOWServerEmulatorUsersManager extends BaseManager {
    protected storageManager: StorageManager;

    protected userIdToUserMap: {[userId: string]: IGOWEmulationUserVO};

    protected construction(...args): void {
        super.construction(...args);

        this.storageManager = getInstance(StorageManager);
        this.userIdToUserMap = this.storageManager.getParam(GOWEmulatorSettings.users.storageId);
        if (!this.userIdToUserMap) {
            this.userIdToUserMap = {};
        }
    }

    protected saveData(): void {
        this.storageManager.setParam(GOWEmulatorSettings.users.storageId, this.userIdToUserMap);
    }


    public createUser(loginData: string): IGOWEmulationUserVO {
        const userData: IGOWEmulationUserVO = {
            id: UniqueTools.getUniqueIdForPool(GOWEmulatorSettings.users.uniquePoolId),
            loginData: loginData,

            resources: {
                money: 0
            }
        };
        this.userIdToUserMap[userData.id] = userData;

        this.saveData();

        return userData;
    }

    public getUserData(userId: string): IGOWEmulationUserVO {
        return this.userIdToUserMap[userId];
    }

    public getUserDataByLogin(loginData: string): IGOWEmulationUserVO {
        let result: IGOWEmulationUserVO;

        const userId: string = this.getUserIdByLogin(loginData);
        if (userId) {
            result = this.getUserData(userId);
        }

        return result;
    }

    protected getUserIdByLogin(loginData: string): string {
        let result: string = "";

        const userIds: string[] = Object.keys(this.userIdToUserMap);
        for (let singleUserId of userIds) {
            const singleUser: IGOWEmulationUserVO = this.userIdToUserMap[singleUserId];
            if (singleUser.loginData === loginData) {
                result = singleUser.id;
                break;
            }
        }

        return result;
    }

}