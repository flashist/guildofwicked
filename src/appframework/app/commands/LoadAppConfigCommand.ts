import {Command} from "fcore";
import {LoadItemCommand, getInstance, GenericObjectsByTypeModel} from "fsuite";
import {IAppConfigVO} from "../data/IAppConfigVO";
import {AppConfigModel} from "../models/AppConfigModel";

export class LoadAppConfigCommand extends Command {

    protected executeInternal(): void {
        super.executeInternal();

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

                    /*let objectsByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);
                    objectsByTypeModel.commitItems([data]);*/

                    appConfigModel.changeConfig(data);

                    let genericObjectsByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);
                    genericObjectsByTypeModel.commitItems(data.startDataItems);

                    this.notifyComplete();
                },
                () => {
                    console.error("LoadAppConfigCommand | executeInternal __ ERROR! Can't load the app-config.json file!")
                    this.notifyComplete();
                }
            );
    }

}