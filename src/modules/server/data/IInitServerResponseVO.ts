import {IServerResponseVO} from "../../../appframework/server/data/IServerResponseVO";
import {IGOWProductionResultVO} from "../../production/data/IGOWProductionResultVO";

export interface IInitServerResponseVO extends IServerResponseVO {
    userId: string;

    timeOffline: number;

    productionResult: IGOWProductionResultVO;
}