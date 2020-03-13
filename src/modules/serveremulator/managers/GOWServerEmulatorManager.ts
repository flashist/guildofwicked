import {getInstance, IGenericObjectVO} from "fsuite";

import {BaseManager} from "../../../appframework/base/managers/BaseManager";
import {IServerRequestVO} from "../../../appframework/server/data/IServerRequestVO";
import {IServerResponseVO} from "../../../appframework/server/data/IServerResponseVO";
import {ServerErrorCode} from "../../../appframework/server/data/ServerErrorCode";
import {GOWServerEmulatorUsersManager} from "./GOWServerEmulatorUsersManager";
import {GOWServerRequestId} from "../../server/data/GOWServerRequestId";
import {IInitServerRequestVO} from "../../server/data/IInitServerRequestVO";
import {IInitServerResponseVO} from "../../server/data/IInitServerResponseVO";
import {GOWServerEmulatorCreateUserCommand} from "../commands/GOWServerEmulatorCreateUserCommand";
import {GOWServerEmulatorTools} from "../tools/GOWServerEmulatorTools";
import {IGOWServerEmulatorUserVO} from "../data/IGOWServerEmulatorUserVO";
import {IGeneratorStartRequestVO} from "../../server/data/IGeneratorStartRequestVO";
import {GOWServerEmulatorGeneratorsManager} from "./GOWServerEmulatorGeneratorsManager";
import {GOWServerErrorCode} from "../data/GOWServerErrorCode";
import {GOWServerEmulatorProductionManager} from "./GOWServerEmulatorProductionManager";
import {IGOWProductionResultVO} from "../../production/data/IGOWProductionResultVO";

/**
 * Class for emulating server-bahavor. In real life cases this class might be used for local-development
 * (e.g. when server-side implementation is not ready, but the client might do their work,
 * if client-server protocol is established).
 */
export class GOWServerEmulatorManager extends BaseManager {

    protected emulatorUsersManager: GOWServerEmulatorUsersManager = getInstance(GOWServerEmulatorUsersManager);
    protected emulatorGeneratorsManager: GOWServerEmulatorGeneratorsManager = getInstance(GOWServerEmulatorGeneratorsManager);
    protected emulatorProductionManager: GOWServerEmulatorProductionManager = getInstance(GOWServerEmulatorProductionManager);

    protected requestIdToMethodMap: {
        [key: string]: (requestData: IServerRequestVO) => Promise<IServerResponseVO>
    };

    protected construction(...args): void {
        super.construction(...args);

        this.requestIdToMethodMap = {};
        //
        this.requestIdToMethodMap[GOWServerRequestId.INIT] = this.processInitRequest;
        this.requestIdToMethodMap[GOWServerRequestId.PING] = this.processPingRequest;
        //
        this.requestIdToMethodMap[GOWServerRequestId.GENERATOR_START] = this.processGeneratorStartRequest;
        this.requestIdToMethodMap[GOWServerRequestId.CALCULATE_PRODUCTION] = this.processCalculateProdctionRequest;
    }

    public sendRequest(requestData: IServerRequestVO): Promise<IServerResponseVO> {

        let handleMethod = this.requestIdToMethodMap[requestData.requestId];
        if (!handleMethod) {
            handleMethod = this.processUnknownRequest;
        }

        return handleMethod.call(this, requestData);
    }

    protected prepareResponse(id: string, errorCode?: string, items?: IGenericObjectVO[]): IServerResponseVO {
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
                const responseData: IServerResponseVO = this.prepareResponse(requestData.requestId);
                responseData.errorCode = ServerErrorCode.UNKNOWN_REQUEST_ID;

                resolve(responseData);
            }
        );
    }

    protected processInitRequest(requestData: IInitServerRequestVO): Promise<IInitServerResponseVO> {
        return new Promise(
            (resolve: Function) => {

                let userData: IGOWServerEmulatorUserVO = this.emulatorUsersManager.getUserDataByLogin(requestData.loginData);
                if (!userData) {
                    new GOWServerEmulatorCreateUserCommand(requestData.loginData)
                        .execute();

                    userData = this.emulatorUsersManager.getUserDataByLogin(requestData.loginData);
                }

                this.emulatorUsersManager.updatePrevSessionLastActivityTime(userData.id, userData.lastActivityServerTime);
                this.emulatorUsersManager.updateLastActivityTime(userData.id);

                const productionResult: IGOWProductionResultVO = this.emulatorProductionManager.calculateProductionForUser(userData.id);

                const items: IGenericObjectVO[] = GOWServerEmulatorTools.prepareUserItemsResponse(userData.id);
                const responseData: Partial<IInitServerResponseVO> = this.prepareResponse(
                    requestData.requestId,
                    null,
                    items
                );
                responseData.userId = userData.id;
                responseData.productionResult = productionResult;
                responseData.timeOffline = Date.now() - userData.prevSessionLastActivityServerTime;

                resolve(responseData);
            }
        );
    }

    protected processCalculateProdctionRequest(requestData: IServerRequestVO): Promise<IServerResponseVO> {
        return new Promise(
            (resolve: Function) => {

                let userData: IGOWServerEmulatorUserVO = this.emulatorUsersManager.getUserDataByLogin(requestData.loginData);
                if (!userData) {
                    new GOWServerEmulatorCreateUserCommand(requestData.loginData)
                        .execute();

                    userData = this.emulatorUsersManager.getUserDataByLogin(requestData.loginData);
                }

                this.emulatorUsersManager.updateLastActivityTime(userData.id);
                this.emulatorProductionManager.calculateProductionForUser(userData.id);

                const items: IGenericObjectVO[] = GOWServerEmulatorTools.prepareUserItemsResponse(userData.id);
                const responseData: Partial<IInitServerResponseVO> = this.prepareResponse(
                    requestData.requestId,
                    null,
                    items
                );

                resolve(responseData);
            }
        );
    }

    protected processPingRequest(requestData: IServerRequestVO): Promise<IServerResponseVO> {
        return new Promise(
            (resolve: Function) => {
                const responseData: IServerResponseVO = this.prepareResponse(requestData.requestId);

                // TODO: get information about user data

                resolve(responseData);
            }
        );
    }

    protected processGeneratorStartRequest(requestData: IGeneratorStartRequestVO): Promise<IServerResponseVO> {
        return new Promise(
            (resolve: Function) => {

                let errorCode: string;

                const userData = this.emulatorUsersManager.getUserDataByLogin(requestData.loginData);
                if (userData) {
                    this.emulatorProductionManager.calculateProductionForUser(userData.id);

                    const generator = this.emulatorGeneratorsManager.getUserSingleGenerator(userData.id, requestData.generatorId);
                    if (generator) {
                        this.emulatorGeneratorsManager.startProduction(userData.id, requestData.generatorId, Date.now());

                    } else {
                        errorCode = GOWServerErrorCode.GENERATOR_NOT_FOUND;
                    }

                } else {
                    errorCode = GOWServerErrorCode.USER_NOT_FOUND;
                }

                const items: IGenericObjectVO[] = GOWServerEmulatorTools.prepareUserItemsResponse(userData.id);
                this.emulatorUsersManager.updateLastActivityTime(userData.id);

                const responseData: IServerResponseVO = this.prepareResponse(
                    requestData.requestId,
                    errorCode,
                    items
                );
                resolve(responseData);
            }
        );
    }
}