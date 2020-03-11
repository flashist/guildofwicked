import {IGenericObjectVO} from "fsuite";

export interface IGOWServerEmulatorUserVO extends IGenericObjectVO {
    loginData: string;

    resources: {[key: string]: number};
}