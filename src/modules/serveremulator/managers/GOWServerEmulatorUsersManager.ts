import {UniqueTools} from "fcore";

import {BaseManager} from "../../../appframework/base/managers/BaseManager";
import {StorageManager} from "../../../appframework/storage/managers/StorageManager";
import {GOWEmulatorSettings} from "../GOWEmulatorSettings";
import {GOWUserVOType} from "../../users/data/GOWUserVOType";
import {IGOWServerEmulatorUserVO} from "../data/IGOWServerEmulatorUserVO";
import {getInstance} from "fsuite";

export class GOWServerEmulatorUsersManager extends BaseManager {
    protected storageManager: StorageManager;

    protected userIdToUserMap: {[userId: string]: IGOWServerEmulatorUserVO};

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


    public createUser(loginData: string): IGOWServerEmulatorUserVO {
        const userData: IGOWServerEmulatorUserVO = {
            id: UniqueTools.getUniqueIdForPool(GOWEmulatorSettings.users.uniquePoolId),
            type: GOWUserVOType,

            loginData: loginData,

            resources: {
                money: 0
            }
        };
        this.userIdToUserMap[userData.id] = userData;

        this.saveData();

        return userData;
    }

    public getUserData(userId: string): IGOWServerEmulatorUserVO {
        return this.userIdToUserMap[userId];
    }

    public getUserDataByLogin(loginData: string): IGOWServerEmulatorUserVO {
        let result: IGOWServerEmulatorUserVO;

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
            const singleUser: IGOWServerEmulatorUserVO = this.userIdToUserMap[singleUserId];
            if (singleUser.loginData === loginData) {
                result = singleUser.id;
                break;
            }
        }

        return result;
    }

}