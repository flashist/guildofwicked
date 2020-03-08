import {Command} from "fcore";
import {LoadItemCommand, getInstance, GenericObjectsByTypeModel} from "fsuite";
import {AppSettings} from "../AppSettings";
import {IAppConfigVO} from "../data/IAppConfigVO";
import {AppConfigModel} from "../models/AppConfigModel";

export class LoadAppConfigCommand extends Command {

    protected executeInternal(): void {
        super.executeInternal();

        new LoadItemCommand({src: AppSettings.appConfigFilePath, id: AppSettings.appConfigFilePath})
            .execute()
            .then(
                (data: IAppConfigVO) => {
                    console.log("LoadAppConfigCommand | executeInternal __ data: ", data);

                    /*let objectsByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);
                    objectsByTypeModel.commitItems([data]);*/

                    let appConfigModel: AppConfigModel = getInstance(AppConfigModel);
                    appConfigModel.appConfig = data;

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