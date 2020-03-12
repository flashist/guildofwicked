import {IServerRequestVO} from "../../../appframework/server/data/IServerRequestVO";

export interface IGeneratorStartRequestVO extends IServerRequestVO {
    generatorId: string;
}