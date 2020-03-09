import {Rectangle} from "fsuite";

import {IAppConfigVO} from "./IAppConfigVO";

export class DefaultAppConfigVO implements IAppConfigVO {
    locale: string = "en";
    appConfigFilePath: string = "assets/app-config.json";
    sizeArea: Rectangle = new Rectangle(0, 0, 800, 600);
}