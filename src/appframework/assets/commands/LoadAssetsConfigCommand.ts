import {
    Command
} from "fcore";

import {
    getInstance,
    LoadItemCommand
} from "fsuite";

import {AppConfigModel} from "../../app/models/AppConfigModel";
import {IAssetsConfigVO} from "../data/IAssetsConfigVO";
import {AssetsModel} from "../models/AssetsModel";

export class LoadAssetsConfigCommand extends Command {

    protected executeInternal(): void {
        super.executeInternal();

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