import {getInstance, IGenericObjectVO} from "@flashist/flibs";
import {GOWServerEmulatorUsersManager} from "../managers/GOWServerEmulatorUsersManager";
import {GOWServerEmulatorGeneratorsManager} from "../managers/GOWServerEmulatorGeneratorsManager";
import {IGOWServerEmulatorUserVO} from "../data/IGOWServerEmulatorUserVO";
import {IGOWServerEmulatorGeneratorVO} from "../data/IGOWServerEmulatorGeneratorVO";

export class GOWServerEmulatorTools {

    static prepareUserItemsResponse(userId: string): IGenericObjectVO[] {
        const result: IGenericObjectVO[] = [];

        // User
        const usersManager: GOWServerEmulatorUsersManager = getInstance(GOWServerEmulatorUsersManager);
        const userData: IGOWServerEmulatorUserVO = usersManager.getUserData(userId);
        result.push(userData);
        // Generators
        const generatorsManager: GOWServerEmulatorGeneratorsManager = getInstance(GOWServerEmulatorGeneratorsManager);
        const userGeneratorsMap = generatorsManager.getUserGenerators(userId);
        let generatorKeys: string[] = Object.keys(userGeneratorsMap);
        for (let singleGeneratorId of generatorKeys) {
            const singleGenerator: IGOWServerEmulatorGeneratorVO = userGeneratorsMap[singleGeneratorId];
            result.push(singleGenerator);
        }

        return result;
    }

}