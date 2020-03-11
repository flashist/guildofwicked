import {IGenericObjectVO} from "fsuite";

export interface IGOWServerEmulatorGeneratorVO extends IGenericObjectVO {
    level: number;
    startProductionTime: number;
    isProductionInProgress: boolean;
}