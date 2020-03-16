import {BaseAppCommand} from "../../../appframework/base/commands/BaseAppCommand";
import {IGOWResourceVO} from "../../resources/data/IGOWResourceVO";
import {GOWUsersModel} from "../models/GOWUsersModel";
import {getInstance} from "fsuite";
import {GOWUserVO} from "../data/GOWUserVO";
import {ObjectTools} from "fcore";

export class GOWChangeUserResourcesClientCommand extends BaseAppCommand {

    protected usersModel: GOWUsersModel = getInstance(GOWUsersModel);

    constructor(protected userId: string, protected resources: IGOWResourceVO[]) {
        super();
    }

    protected executeInternal(): void {
        const userData: GOWUserVO = this.usersModel.getItem(this.userId);
        if (userData) {

            const newResources: {[resourceType: string]: IGOWResourceVO} = {};
            ObjectTools.copyProps(newResources, userData.resources);
            //
            for (let singleResource of this.resources) {
                if (newResources[singleResource.type]) {
                    newResources[singleResource.type].value += singleResource.value;

                } else {
                    newResources[singleResource.type] = singleResource;
                }
            }

            userData.update({resources: newResources});
        }
    }
}