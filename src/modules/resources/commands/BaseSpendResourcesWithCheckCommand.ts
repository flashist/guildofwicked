import {BaseAppCommand} from "../../../appframework/base/commands/BaseAppCommand";
import {IGOWResourceVO} from "../data/IGOWResourceVO";
import {ICheckEnoughResourcesVO} from "../data/ICheckEnoughResourcesVO";
import {CheckEnoughResourcesCommand} from "./CheckEnoughResourcesCommand";
import {GOWTextTools} from "../../texts/tools/GOWTextTools";

export abstract class BaseSpendResourcesWithCheckCommand extends BaseAppCommand {

    protected executeInternal(): void {
        new CheckEnoughResourcesCommand(this.getResourcesToCheck())
            .execute()
            .then(
                (checkResult: ICheckEnoughResourcesVO) => {
                    if (checkResult.isEnough) {
                        this.enoughResourcesExecute();

                    } else {
                        const notEnoughResourcesText: string = GOWTextTools.getFormattedResourcesList(checkResult.notEnoughResourcesList);
                        alert("Imagine: Buying Resource Dialogue Shown: " + notEnoughResourcesText);

                        this.notifyComplete();
                    }
                }
            );
    }

    protected abstract getResourcesToCheck(): IGOWResourceVO[];
    protected abstract enoughResourcesExecute(): void;
}