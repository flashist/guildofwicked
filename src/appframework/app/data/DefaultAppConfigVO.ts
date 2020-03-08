import {IAppConfigVO} from "./IAppConfigVO";

export class DefaultAppConfigVO implements IAppConfigVO {
    locale: string = "en";
    appConfigFilePath: string = "assets/app-config.json";
}