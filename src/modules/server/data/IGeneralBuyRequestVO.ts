import {IServerRequestVO} from "../../../appframework/server/data/IServerRequestVO";

export interface IGeneralBuyRequestVO extends IServerRequestVO {
    objectType: string;
    objectId: string;
}