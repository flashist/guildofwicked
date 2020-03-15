import {getInstance} from "fsuite";

import {IGOWResourceVO} from "../data/IGOWResourceVO";
import {ICheckEnoughResourcesVO} from "../data/ICheckEnoughResourcesVO";
import {GOWUsersModel} from "../../users/models/GOWUsersModel";

export class GOWResourcesTools {

    static checkIfEnoughResources(resources: IGOWResourceVO[]): ICheckEnoughResourcesVO {
        const result: ICheckEnoughResourcesVO = {
            isEnough: true,
            notEnoughResources: {},
            notEnoughResourcesList: []
        };

        const usersModel: GOWUsersModel = getInstance(GOWUsersModel);
        for (let singleResource of resources) {
            const userSingleResource: IGOWResourceVO = usersModel.curUserData.getResource(singleResource.type);
            const resourceValueDelta: number = singleResource.value - userSingleResource.value;
            if (resourceValueDelta > 0) {
                result.isEnough = false;

                if (!result.notEnoughResources[singleResource.type]) {
                    result.notEnoughResources[singleResource.type] = {
                        type: singleResource.type,
                        value: 0
                    };
                }

                result.notEnoughResources[singleResource.type].value += resourceValueDelta;
            }
        }

        const resourceTypes: string[] = Object.keys(result.notEnoughResources);
        for (let singleResourceType of resourceTypes) {
            result.notEnoughResourcesList.push(
                result.notEnoughResources[singleResourceType]
            );
        }

        return result;
    }

}