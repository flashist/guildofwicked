import {getText} from "fsuite";

import {GOWResourceType} from "../../resources/data/GOWResourceType";
import {GOWSettings} from "../../../GOWSettings";
import {DateSettings} from "../../../appframework/date/DateSettings";

export class GOWTextTools {
    private static formatter = new Intl.NumberFormat();

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

        let configObj = {
            seconds: Math.floor(duration / DateSettings.MS_IN_SECOND),
            minutes: Math.floor(duration / DateSettings.MS_IN_MINUTE),
            hours: Math.floor(duration / DateSettings.MS_IN_HOUR),
            days: Math.floor(duration / DateSettings.MS_IN_DAY)
        };
        let localeId: string = "";
        if (duration < DateSettings.MS_IN_MINUTE) {
            localeId = "seconds";
        } else if (duration < DateSettings.MS_IN_HOUR) {
            localeId = "minutesAndSeconds";
            configObj.seconds = Math.floor((duration - configObj.minutes * DateSettings.MS_IN_MINUTE) / DateSettings.MS_IN_SECOND);

        } else if (duration < DateSettings.MS_IN_DAY) {
            localeId = "hoursAndMinutes";
            configObj.minutes = Math.floor((duration - configObj.hours * DateSettings.MS_IN_HOUR) / DateSettings.MS_IN_MINUTE);

        } else {
            localeId = "daysAndHours";
            configObj.hours = Math.floor((duration - configObj.days * DateSettings.MS_IN_DAY) / DateSettings.MS_IN_HOUR);
        }

        const result: string = getText(
            localeId,
            configObj
        );
        return result;
    }
}