import {getInstance} from "fsuite";

import {BaseAppCommand} from "../../../appframework/base/commands/BaseAppCommand";
import {IGOWResourceVO} from "../data/IGOWResourceVO";
import {ICheckEnoughResourcesVO} from "../data/ICheckEnoughResourcesVO";
import {GOWResourcesTools} from "../tools/GOWResourcesTools";
import {GOWChangeUserResourcesClientCommand} from "../../users/command/GOWChangeUserResourcesClientCommand";
import {GOWUsersModel} from "../../users/models/GOWUsersModel";

export abstract class BaseSpendResourcesWithCheckCommand extends BaseAppCommand {

    protected usersModel: GOWUsersModel = getInstance(GOWUsersModel);

    constructor(protected fakeSpendResources: boolean = true) {
        super();
    }

    protected executeInternal(): void {
        if (this.spendResourcesGuard()) {
            if (this.fakeSpendResources) {

                const reduceResources: IGOWResourceVO[] = [];
                for (let singleResource of this.resourcesToSpend) {
                    reduceResources.push(
                        {
                            type: singleResource.type,
                            value: -1 * singleResource.value
                        }
                    );
                }

                new GOWChangeUserResourcesClientCommand(this.usersModel.curUserId, reduceResources)
                    .execute();
            }

            this.enoughResourcesExecute();

        } else {
            alert("Imagine: Not Enough Resources Dialogue Shown");
            this.notifyComplete();
        }
    }

    protected spendResourcesGuard(): boolean {
        const checkResult: ICheckEnoughResourcesVO = GOWResourcesTools.checkIfEnoughResources(this.resourcesToSpend);
        return checkResult.isEnough;
    }

    protected abstract get resourcesToSpend(): IGOWResourceVO[];
    protected abstract enoughResourcesExecute(): void;
}