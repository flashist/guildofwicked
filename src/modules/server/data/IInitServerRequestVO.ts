import {IServerRequestVO} from "../../../appframework/server/data/IServerRequestVO";

export interface IInitServerRequestVO extends IServerRequestVO {
    loginData: string;
}