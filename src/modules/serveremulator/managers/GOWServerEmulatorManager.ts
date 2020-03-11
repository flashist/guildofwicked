import {getInstance, IGenericObjectVO} from "fsuite";

import {BaseManager} from "../../../appframework/base/managers/BaseManager";
import {IServerRequestVO} from "../../../appframework/server/data/IServerRequestVO";
import {IServerResponseVO} from "../../../appframework/server/data/IServerResponseVO";
import {ServerErrorCode} from "../../../appframework/server/data/ServerErrorCode";
import {GOWServerEmulatorUsersManager} from "./GOWServerEmulatorUsersManager";
import {GOWServerRequestId} from "../../server/data/GOWServerRequestId";
import {IInitServerRequestVO} from "../../server/data/IInitServerRequestVO";
import {IInitServerResponseVO} from "../../server/data/IInitServerResponseVO";
import {IGOWEmulationUserVO} from "../data/IGOWEmulationUserVO";

export class GOWServerEmulatorManager extends BaseManager {

    protected emulationUsersManager: GOWServerEmulatorUsersManager = getInstance(GOWServerEmulatorUsersManager);

    protected requestIdToMethodMap: {
        [key: string]: (requestData: IServerRequestVO) => Promise<IServerResponseVO>
    };

    protected construction(...args): void {
        super.construction(...args);

        this.requestIdToMethodMap = {};
        //
        this.requestIdToMethodMap[GOWServerRequestId.INIT] = this.processInitRequest;
        this.requestIdToMethodMap[GOWServerRequestId.PING] = this.processPingRequest;
    }

    public sendRequest(requestData: IServerRequestVO): Promise<IServerResponseVO> {
        let handleMethod = this.requestIdToMethodMap[requestData.id];
        if (!handleMethod) {
            handleMethod = this.processUnknownRequest;
        }

        return handleMethod.call(this, requestData);
    }

    protected prepareResponse(id: string, items?: IGenericObjectVO[]): IServerResponseVO {
        const result: IServerResponseVO =  {
            id: id,
            time: Date.now()
        };
        if (items) {
            result.items = items;
        }

        return result;
    }

    protected processUnknownRequest(requestData: IServerRequestVO): Promise<IServerResponseVO> {
        return new Promise(
            (resolve: Function) => {
                const responseData: IServerResponseVO = this.prepareResponse(requestData.id);
                responseData.errorCode = ServerErrorCode.UNKNOWN_REQUEST_ID;

                resolve(responseData);
            }
        );
    }

    protected processInitRequest(requestData: IInitServerRequestVO): Promise<IInitServerResponseVO> {
        return new Promise(
            (resolve: Function) => {

                let userData: IGOWEmulationUserVO = this.emulationUsersManager.getUserDataByLogin(requestData.loginData);
                if (!userData) {
                    userData = this.emulationUsersManager.createUser(requestData.loginData);
                }

                const responseData: Partial<IInitServerResponseVO> = this.prepareResponse(
                    requestData.id,
                    [userData]
                );
                responseData.userId = userData.id;

                resolve(responseData);
            }
        );
    }

    protected processPingRequest(requestData: IServerRequestVO): Promise<IServerResponseVO> {
        return new Promise(
            (resolve: Function) => {
                const responseData: IServerResponseVO = this.prepareResponse(requestData.id);

                // TODO: get information about user data

                resolve(responseData);
            }
        );
    }
}