import {getInstance} from "fsuite";

import {BaseAppCommand} from "../../../appframework/base/commands/BaseAppCommand";
import {IGOWResourceVO} from "../data/IGOWResourceVO";
import {GOWResourcesTools} from "../tools/GOWResourcesTools";
import {ICheckEnoughResourcesVO} from "../data/ICheckEnoughResourcesVO";

export class CheckEnoughResourcesCommand extends BaseAppCommand<ICheckEnoughResourcesVO> {

    constructor(protected resources: IGOWResourceVO[]) {
        super();
    }

    protected executeInternal(): void {
        const checkResourcesResult: ICheckEnoughResourcesVO = GOWResourcesTools.checkIfEnoughResources(this.resources);
        this.notifyComplete(checkResourcesResult);
    }
}