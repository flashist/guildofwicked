import {IGenericObjectVO} from "fsuite";

export interface IGOWServerEmulatorGeneratorVO extends IGenericObjectVO {
    level: number;
    isProductionInProgress: boolean;
    startProductionServerTime: number;
    bonusIds: string[];
}