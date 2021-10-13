import {getInstance} from "@flashist/flibs";
import {IGOWResourceVO} from "../../resources/data/IGOWResourceVO";
import {GOWServerEmulatorUsersManager} from "../managers/GOWServerEmulatorUsersManager";
import {IGOWServerEmulatorUserVO} from "../data/IGOWServerEmulatorUserVO";


export class GOWServerEmulatorResourcesTools {

    static checkIfEnoughResources(
        userId: string,
        resources: IGOWResourceVO[]): boolean {

        let result: boolean = true;

        const usersManager: GOWServerEmulatorUsersManager = getInstance(GOWServerEmulatorUsersManager);
        const userData: IGOWServerEmulatorUserVO = usersManager.getUserData(userId);

        for (let singleResource of resources) {
            let userSingleResource: IGOWResourceVO = userData.resources[singleResource.type];
            if (!userSingleResource) {
                userSingleResource = {
                    type: singleResource.type,
                    value: 0
                }
            }

            const resourceValueDelta: number = singleResource.value - userSingleResource.value;
            if (resourceValueDelta > 0) {
                result = false;
            }
        }

        return result;
    }

}