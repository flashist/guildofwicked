import {IGenericObjectVO} from "fsuite";

export interface IGOWServerEmulatorGeneratorVO extends IGenericObjectVO {
    level: number;
    startProductionServerTime: number;
    isProductionInProgress: boolean;
}