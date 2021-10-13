import {
    ObjectTools,
    StringTools
} from "@flashist/fcore";

import {
    getInstance,
    LocaleManager,
    ILocaleConfig,
    LoadItemCommand,
    ILoadItemConfig
} from "@flashist/flibs";

import {AppConfigModel} from "../../app/models/AppConfigModel";
import {BaseAppCommand} from "../../base/commands/BaseAppCommand";

export class LoadLocalizaitonCommand extends BaseAppCommand {

    protected executeInternal(): void {
        let appConfigModel: AppConfigModel = getInstance(AppConfigModel);

        const locale: string = appConfigModel.appConfig.locale;

        const localeFileSrc: string = StringTools.substitute(
            appConfigModel.appConfig.localeConfigFile.src,
            {
                locale: locale
            }
        );
        const localeFileConfig: ILoadItemConfig = {} as any;
        ObjectTools.copyProps(localeFileConfig, appConfigModel.appConfig.localeConfigFile);
        localeFileConfig.src = localeFileSrc;
        //
        let tempCmd = new LoadItemCommand(localeFileConfig);
        tempCmd.execute()
            .then(
                (data: ILocaleConfig) => {

                    let localizationJson: ILocaleConfig = data;

                    let localeManager: LocaleManager = getInstance<LocaleManager>(LocaleManager);
                    localeManager.setCurrentLanguage(locale);
                    localeManager.addLocale(localizationJson, locale);

                    this.notifyComplete();
                },
                () => {
                    this.errorCode = tempCmd.errorCode;
                    this.notifyComplete();
                }
            );
    }
}