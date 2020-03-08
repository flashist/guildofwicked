import {
    Command,
    ObjectTools,
    StringTools
} from "fcore";

import {
    getInstance,
    LocaleManager,
    ILocaleConfig,
    LoadItemCommand,
    ILoadItemConfig
} from "fsuite";

import {AppConfigModel} from "../../app/models/AppConfigModel";

export class InitLocalesCommand extends Command {

    protected executeInternal(): void {
        super.executeInternal();

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