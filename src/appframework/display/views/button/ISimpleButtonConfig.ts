import {IFLabelConfig} from "fsuite";

export interface ISimpleButtonConfig {
    bgConfig?: {
        image?: {
            imageId: string;
        };

        vector?: {
            bgColor: number;
            overBgColor: number;
            bgAlpha: number;
            bgBorderColor: number;
            bgBorderAlpha: number;
            bgBorderWidth: number;
        }

        resizeBg: boolean;
    };

    labelConfig?: IFLabelConfig;
}