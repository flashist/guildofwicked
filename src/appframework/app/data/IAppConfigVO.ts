import {
    IGenericObjectVO,
    ILoadItemConfig
} from "fsuite";

export interface IAppConfigVO extends IGenericObjectVO {
    locale?: string;

    assetsConfigFile?: ILoadItemConfig;
    localeConfigFile?: ILoadItemConfig;

    startDataItems?: IGenericObjectVO[];

    targetFps?: number;
}