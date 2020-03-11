import {GOWResourceType} from "../data/GOWResourceType";
import {GOWSettings} from "../../../GOWSettings";
import {getText} from "fsuite";

export class GOWResourcesTools {

    private static formatter = new Intl.NumberFormat();

    static getFormattedResourceAmount(amount: number, resourceType: GOWResourceType): string {
        let resourceLocaleId: string = GOWSettings.resources[resourceType].localeId;

        const result: string = getText(
            resourceLocaleId,
            {
                value: GOWResourcesTools.formatter.format(amount)
            }
        );
        return result;
    }

}