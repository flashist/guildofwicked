import {getInstance, getText} from "fsuite";

import {BaseAppCommand} from "../../../appframework/base/commands/BaseAppCommand";
import {GOWServerModel} from "../../server/models/GOWServerModel";
import {IGOWResourceVO} from "../../resources/data/IGOWResourceVO";
import {GOWTextTools} from "../../texts/tools/GOWTextTools";
import {GOWSimplePopupIntent} from "../../app/events/GOWSimplePopupIntent";

export class GOWShowOfflineProductionInfoCommand extends BaseAppCommand {

    protected serverModel: GOWServerModel = getInstance(GOWServerModel);

    protected executeInternal(): void {
        let infoText: string = "";

        if (this.serverModel.initResponse.productionResult) {
            let isOfflineProductionComplete: boolean = false;

            let formattedResourcesText: string = "";
            let resourceIds: string[] = Object.keys(this.serverModel.initResponse.productionResult.totalProfit);
            let resourceIdsCount: number = resourceIds.length;
            for (let resourceIdIndex: number = 0; resourceIdIndex < resourceIdsCount; resourceIdIndex++) {
                const singleResourceId: string = resourceIds[resourceIdIndex];
                let singleResource: IGOWResourceVO = this.serverModel.initResponse.productionResult.totalProfit[singleResourceId];
                const singleResourceText: string = GOWTextTools.getFormattedResourceAmount(singleResource);

                if (resourceIdIndex > 0) {
                    formattedResourcesText += ", "
                }
                formattedResourcesText += singleResourceText;

                //
                isOfflineProductionComplete = true;
            }

            if (isOfflineProductionComplete) {
                infoText = getText(
                    "loginProductionResultPlaceholder",
                    {
                        time: GOWTextTools.getFormattedHoursMinutesSeconds(this.serverModel.initResponse.timeOffline),
                        value: formattedResourcesText
                    }
                );
            }
        }

        if (infoText) {
            this.globalDispatcher.dispatchEvent(GOWSimplePopupIntent.SHOW, infoText);
        }

        this.notifyComplete();
    }
}