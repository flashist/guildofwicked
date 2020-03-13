import {IGenericObjectVO} from "fsuite";
import {IGOWResourceVO} from "../../resources/data/IGOWResourceVO";

export interface IGOWServerEmulatorUserVO extends IGenericObjectVO {
    loginData: string;
    prevSessionLastActivityServerTime: number;
    lastActivityServerTime: number;

    resources: {[resourceType: string]: IGOWResourceVO};
}