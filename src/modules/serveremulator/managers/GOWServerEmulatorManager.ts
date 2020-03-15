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
import {IGeneralBuyRequestVO} from "../../server/data/IGeneralBuyRequestVO";
import {GOWServerEmulatorBuyManager} from "./GOWServerEmulatorBuyManager";
import {GOWGeneratorVOType} from "../../generators/data/GOWGeneratorVOType";

/**
 * Class for emulating server-bahavor. In real life cases this class might be used for local-development
 * (e.g. when server-side implementation is not ready, but the client might do their work,
 * if client-server protocol is established).
 */
export class GOWServerEmulatorManager extends BaseManager {

    protected emulatorUsersManager: GOWServerEmulatorUsersManager = getInstance(GOWServerEmulatorUsersManager);
    protected emulatorGeneratorsManager: GOWServerEmulatorGeneratorsManager = getInstance(GOWServerEmulatorGeneratorsManager);
    protected emulatorProductionManager: GOWServerEmulatorProductionManager = getInstance(GOWServerEmulatorProductionManager);
    protected emulatorBuyEmulatorBuyManager: GOWServerEmulatorBuyManager = getInstance(GOWServerEmulatorBuyManager);

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
        this.requestIdToMethodMap[GOWServerRequestId.GENERAL_BUY] = this.processGeneralBuy;
    }

    public async sendRequest(requestData: IServerRequestVO): Promise<IServerResponseVO> {

        let handleMethod = this.requestIdToMethodMap[requestData.requestId];
        if (!handleMethod) {
            handleMethod = this.processUnknownRequest;
        }

        return handleMethod.call(this, requestData);
        // return handleMethod(requestData);
    }

    protected prepareResponse<Type extends IServerResponseVO>(
        sourceResponse: Type
    ): Type {

        sourceResponse.time = Date.now();
        return sourceResponse;

    }

    protected async processUnknownRequest(requestData: IServerRequestVO): Promise<IServerResponseVO> {
        const responseData: IServerResponseVO = this.prepareResponse(
            {
                id: requestData.requestId,
                errorCode: ServerErrorCode.UNKNOWN_REQUEST_ID
            }
        );
        return Promise.resolve(responseData);
    }

    protected async processInitRequest(requestData: IInitServerRequestVO): Promise<IInitServerResponseVO> {
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
        const responseData: IInitServerResponseVO = this.prepareResponse<IInitServerResponseVO>(
            {
                id: requestData.requestId,
                items: items,
                userId: userData.id,
                productionResult: productionResult,
                timeOffline: Date.now() - userData.prevSessionLastActivityServerTime
            }
        );

        return Promise.resolve(responseData);
    }

    protected async processCalculateProdctionRequest(requestData: IServerRequestVO): Promise<IServerResponseVO> {
        let userData: IGOWServerEmulatorUserVO = this.emulatorUsersManager.getUserDataByLogin(requestData.loginData);
        if (!userData) {
            new GOWServerEmulatorCreateUserCommand(requestData.loginData)
                .execute();

            userData = this.emulatorUsersManager.getUserDataByLogin(requestData.loginData);
        }

        this.emulatorUsersManager.updateLastActivityTime(userData.id);
        this.emulatorProductionManager.calculateProductionForUser(userData.id);

        const items: IGenericObjectVO[] = GOWServerEmulatorTools.prepareUserItemsResponse(userData.id);
        const responseData: IServerResponseVO = this.prepareResponse(
            {
                id: requestData.requestId,
                items: items
            }
        );

        return Promise.resolve(responseData);
    }

    protected processPingRequest(requestData: IServerRequestVO): Promise<IServerResponseVO> {
        return new Promise(
            (resolve: Function) => {
                const responseData: IServerResponseVO = this.prepareResponse(
                    {id: requestData.requestId}
                );

                resolve(responseData);
            }
        );
    }

    protected async processGeneratorStartRequest(requestData: IGeneratorStartRequestVO): Promise<IServerResponseVO> {
        let errorCode: string;
        let errorMessage: string;

        const userData = this.emulatorUsersManager.getUserDataByLogin(requestData.loginData);
        if (userData) {
            this.emulatorProductionManager.calculateProductionForUser(userData.id);

            const generator = this.emulatorGeneratorsManager.getUserSingleGenerator(userData.id, requestData.generatorId);
            if (generator) {
                this.emulatorGeneratorsManager.startProduction(userData.id, requestData.generatorId, Date.now());

            } else {
                errorCode = GOWServerErrorCode.OBJECT_NOT_FOUND;
                errorMessage = `objectType: ${GOWGeneratorVOType}, objectId: ${requestData.generatorId}`;
            }

        } else {
            errorCode = GOWServerErrorCode.USER_NOT_FOUND;
        }

        const items: IGenericObjectVO[] = GOWServerEmulatorTools.prepareUserItemsResponse(userData.id);
        this.emulatorUsersManager.updateLastActivityTime(userData.id);

        const responseData: IServerResponseVO = this.prepareResponse(
            {
                id: requestData.requestId,
                errorCode: errorCode,
                errorMessage: errorMessage,
                items: items
            }
        );
        return Promise.resolve(responseData);
    }

    protected async processGeneralBuy(requestData: IGeneralBuyRequestVO): Promise<IServerResponseVO> {
        let errorCode: string;
        let errorMessage: string;

        const userData = this.emulatorUsersManager.getUserDataByLogin(requestData.loginData);
        if (userData) {
            const buyResult: Partial<IServerResponseVO> = await this.emulatorBuyEmulatorBuyManager.processGeneralBuy(
                userData.id,
                requestData.objectType,
                requestData.objectId
            );
            errorCode = buyResult.errorCode;
            errorMessage = buyResult.errorMessage;

        } else {
            errorCode = GOWServerErrorCode.USER_NOT_FOUND;
        }

        const items: IGenericObjectVO[] = GOWServerEmulatorTools.prepareUserItemsResponse(userData.id);
        this.emulatorUsersManager.updateLastActivityTime(userData.id);

        const responseData: IServerResponseVO = this.prepareResponse(
            {
                id: requestData.requestId,
                errorCode: errorCode,
                errorMessage: errorMessage,
                items: items
            }
        );

        return Promise.resolve(responseData);
    }

}