import {
    LoadItemCommand,
    getInstance,
    GenericObjectsByTypeModel
} from "fsuite";

import {AppConfigModel} from "../models/AppConfigModel";
import {BaseAppCommand} from "../../base/commands/BaseAppCommand";
import {IItemsConfigVO} from "../data/IItemsConfigVO";

export class LoadStaticItemsCommand extends BaseAppCommand {

    protected executeInternal(): void {
        let appConfigModel: AppConfigModel = getInstance(AppConfigModel);

        let tempCmd = new LoadItemCommand(appConfigModel.appConfig.staticItemsFile);
        tempCmd.execute()
            .then(
                (data: IItemsConfigVO) => {

                    let genericObjectsByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);
                    if (data.items) {
                        genericObjectsByTypeModel.commitItems(data.items);
                    }

                    this.notifyComplete();
                },
                () => {
                    this.errorCode = tempCmd.errorCode;
                    this.notifyComplete();
                }
            );
    }

}