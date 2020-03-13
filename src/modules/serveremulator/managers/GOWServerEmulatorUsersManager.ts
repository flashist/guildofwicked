import {UniqueTools} from "fcore";
import {getInstance} from "fsuite";

import {BaseManager} from "../../../appframework/base/managers/BaseManager";
import {StorageManager} from "../../../appframework/storage/managers/StorageManager";
import {GOWEmulatorSettings} from "../GOWEmulatorSettings";
import {GOWUserVOType} from "../../users/data/GOWUserVOType";
import {IGOWServerEmulatorUserVO} from "../data/IGOWServerEmulatorUserVO";
import {GOWResourceType} from "../../resources/data/GOWResourceType";

export class GOWServerEmulatorUsersManager extends BaseManager {
    protected storageManager: StorageManager;

    protected userIdToUserMap: {[userId: string]: IGOWServerEmulatorUserVO};

    protected construction(...args): void {
        super.construction(...args);

        this.storageManager = getInstance(StorageManager);

        const storageText: string = this.storageManager.getParam(GOWEmulatorSettings.users.storageId);
        if (storageText) {
            this.userIdToUserMap = JSON.parse(storageText);
        } else {
            this.userIdToUserMap = {};
        }
    }

    protected saveData(): void {
        this.storageManager.setParam(
            GOWEmulatorSettings.users.storageId,
            JSON.stringify(this.userIdToUserMap)
        );
    }


    public createUser(loginData: string): IGOWServerEmulatorUserVO {
        const userData: IGOWServerEmulatorUserVO = {
            id: UniqueTools.getUniqueIdForPool(GOWEmulatorSettings.users.uniquePoolId),
            type: GOWUserVOType,

            loginData: loginData,
            lastActivityServerTime: Date.now(),
            prevSessionLastActivityServerTime: Date.now(),

            resources: {
                money: {
                    type: GOWResourceType.MONEY,
                    value: 0
                }
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

    public updateLastActivityTime(userId: string): void {
        const userData: IGOWServerEmulatorUserVO = this.getUserData(userId);
        userData.lastActivityServerTime = Date.now();

        this.saveData();
    }

    public updatePrevSessionLastActivityTime(userId: string, serverTime: number): void {
        const userData: IGOWServerEmulatorUserVO = this.getUserData(userId);
        userData.prevSessionLastActivityServerTime = serverTime;

        this.saveData();
    }
}