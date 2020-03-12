import {ServerModel} from "../../../appframework/server/models/ServerModel";
import {getInstance} from "fsuite";

export class GOWTimeTools {

    static convertClientToServerTime(clientTime: number): number {
        const serverModel: ServerModel = getInstance(ServerModel);
        return clientTime - serverModel.clientToServerTimeDelta;
    }

    static convertServerToClientTime(serverTime: number): number {
        const serverModel: ServerModel = getInstance(ServerModel);
        return serverTime + serverModel.clientToServerTimeDelta;
    }

    /**
     * Returning prediction of the current server time.
     */
    static getCurrentServerTimeClientPrediction(): number {
        return GOWTimeTools.convertClientToServerTime(Date.now());
    }
}