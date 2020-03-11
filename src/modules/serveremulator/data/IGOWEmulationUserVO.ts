import {IGenericObjectVO} from "fsuite";

export interface IGOWEmulationUserVO extends IGenericObjectVO {
    loginData: string;

    resources: {[key: string]: number};
}