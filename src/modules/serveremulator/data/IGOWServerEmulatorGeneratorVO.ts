import {IGenericObjectVO} from "@flashist/flibs";

export interface IGOWServerEmulatorGeneratorVO extends IGenericObjectVO {
    level: number;
    isProductionInProgress: boolean;
    startProductionServerTime: number;

    boughtUpgradeIds: string[];
}