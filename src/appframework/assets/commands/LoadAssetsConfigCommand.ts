import {
    getInstance,
    LoadItemCommand
} from "@flashist/flibs";

import {AppConfigModel} from "../../app/models/AppConfigModel";
import {IAssetsConfigVO} from "../data/IAssetsConfigVO";
import {AssetsModel} from "../models/AssetsModel";
import {BaseAppCommand} from "../../base/commands/BaseAppCommand";

export class LoadAssetsConfigCommand extends BaseAppCommand {

    protected executeInternal(): void {
        let appConfigModel: AppConfigModel = getInstance(AppConfigModel);
        let tempCmd = new LoadItemCommand(appConfigModel.appConfig.assetsConfigFile);
        tempCmd.execute()
            .then(
                (data: IAssetsConfigVO) => {
                    let tempModel: AssetsModel = getInstance(AssetsModel) as AssetsModel;
                    tempModel.assetsConfig = data;

                    this.notifyComplete();
                },
                () => {
                    this.errorCode = tempCmd.errorCode;
                    this.notifyComplete();
                }
            );
    }
}