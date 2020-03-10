import {IFLabelConfig} from "fsuite";

export interface ISimpleButtonConfig {
    bgConfig: {
        bgColor: number;
        bgAlpha: number;
        bgBorderColor: number;
        bgBorderAlpha: number;
        bgBorderWidth: number;
    };

    labelConfig: IFLabelConfig;
}