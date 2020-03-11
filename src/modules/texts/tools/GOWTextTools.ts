import {getText} from "fsuite";

import {GOWResourceType} from "../../resources/data/GOWResourceType";
import {GOWSettings} from "../../../GOWSettings";

export class GOWTextTools {
    private static formatter = new Intl.NumberFormat();

    private static MS_IN_SECOND: number = 1000;
    private static MS_IN_MINUTE: number = 1000 * 60;
    private static MS_IN_HOUR: number = 1000 * 60 * 60;
    private static MS_IN_DAY: number = 1000 * 60 * 60 * 24;

    static getFormattedResourceAmount(amount: number, resourceType: GOWResourceType): string {
        let resourceLocaleId: string = GOWSettings.resources[resourceType].localeId;

        const result: string = getText(
            resourceLocaleId,
            {
                value: GOWTextTools.formatter.format(amount)
            }
        );
        return result;
    }

    static getFormattedDuration(duration: number): string {
        let result: string;

        return result;
    }
}