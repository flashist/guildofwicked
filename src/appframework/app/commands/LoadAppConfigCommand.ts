import {
    LoadItemCommand,
    getInstance
} from "@flashist/flibs";

import {IAppConfigVO} from "../data/IAppConfigVO";
import {AppConfigModel} from "../models/AppConfigModel";
import {BaseAppCommand} from "../../base/commands/BaseAppCommand";

export class LoadAppConfigCommand extends BaseAppCommand {

    protected executeInternal(): void {
        const appConfigModel: AppConfigModel = getInstance(AppConfigModel);
        new LoadItemCommand(
            {
                src: appConfigModel.appConfig.appConfigFilePath,
                id: appConfigModel.appConfig.appConfigFilePath
            }
        )
            .execute()
            .then(
                (data: IAppConfigVO) => {
                    console.log("LoadAppConfigCommand | executeInternal __ data: ", data);

                    appConfigModel.changeConfig(data);

                    this.notifyComplete();
                },
                () => {
                    console.error("LoadAppConfigCommand | executeInternal __ ERROR! Can't load the app-config.json file!")
                    this.notifyComplete();
                }
            );
    }

}