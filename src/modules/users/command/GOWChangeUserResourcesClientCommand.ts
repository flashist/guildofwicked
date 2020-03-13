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
            const changeResourcesData: { [resourceType: string]: IGOWResourceVO } = userData.resources;
            for (let singleResource of this.resources) {
                if (userData.resources[singleResource.type]) {
                    changeResourcesData[singleResource.type].value += singleResource.value;
                } else {
                    changeResourcesData[singleResource.type] = singleResource;
                }
            }

            userData.update({resources: changeResourcesData});
        }
    }
}