import {
    IGenericObjectVO,
    ILoadItemConfig
} from "fsuite";

export interface IAppConfigVO extends IGenericObjectVO {
    locale?: string;
    appConfigFilePath?: string;

    assetsConfigFile?: ILoadItemConfig;
    localeConfigFile?: ILoadItemConfig;

    startDataItems?: IGenericObjectVO[];

    targetFps?: number;
}