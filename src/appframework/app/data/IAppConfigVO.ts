import {
    IGenericObjectVO,
    ILoadItemConfig,
    Rectangle
} from "fsuite";

export interface IAppConfigVO extends IGenericObjectVO {
    locale?: string;
    appConfigFilePath?: string;

    assetsConfigFile?: ILoadItemConfig;
    localeConfigFile?: ILoadItemConfig;
    staticItemsFile?: ILoadItemConfig;

    startDataItems?: IGenericObjectVO[];

    targetFps?: number;
    sizeArea?: Partial<Rectangle>;

    appSettings?: any;
}