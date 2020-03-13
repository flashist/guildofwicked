import {BaseAppCommand} from "../../../appframework/base/commands/BaseAppCommand";
import {IGOWResourceVO} from "../../resources/data/IGOWResourceVO";
import {GOWUsersModel} from "../models/GOWUsersModel";
import {getInstance} from "fsuite";
import {GOWUserVO} from "../data/GOWUserVO";

export class GOWChangeUserResourcesClientCommand extends BaseAppCommand {

    protected usersModel: GOWUsersModel = getInstance(GOWUsersModel);

    constructor(protected userId: string, protected resources: IGOWResourceVO[]) {
        super();
    }

    protected executeInternal(): void {
        const userData: GOWUserVO = this.usersModel.getItem(this.userId);
        if (userData) {

            const changeResources: { [resourceType: string]: IGOWResourceVO } = {};
            for (let singleResource of this.resources) {
                if (changeResources[singleResource.type]) {
                    changeResources[singleResource.type].value += singleResource.value;
                } else {
                    changeResources[singleResource.type] = singleResource;
                }
            }

            let userResourceTypes: string[] = Object.keys(userData.resources);
            for (let singleUserResourceType of userResourceTypes) {
                if (changeResources[singleUserResourceType]) {
                    changeResources[singleUserResourceType].value += userData.resources[singleUserResourceType].value;
                }
            }

            userData.update({resources: changeResources});
        }
    }
}