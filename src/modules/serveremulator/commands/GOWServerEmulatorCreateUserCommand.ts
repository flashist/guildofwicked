import {Command} from "@flashist/fcore";
import {IGOWGeneratorStaticVO} from "../../generators/data/IGOWGeneratorStaticVO";
import {GOWGeneratorsTools} from "../../generators/tools/GOWGeneratorsTools";
import {getInstance} from "@flashist/flibs";
import {GOWServerEmulatorGeneratorsManager} from "../managers/GOWServerEmulatorGeneratorsManager";
import {GOWServerEmulatorUsersManager} from "../managers/GOWServerEmulatorUsersManager";
import {IGOWServerEmulatorUserVO} from "../data/IGOWServerEmulatorUserVO";

export class GOWServerEmulatorCreateUserCommand extends Command {

    protected usersManager: GOWServerEmulatorUsersManager = getInstance(GOWServerEmulatorUsersManager);
    protected generatorsManager: GOWServerEmulatorGeneratorsManager = getInstance(GOWServerEmulatorGeneratorsManager);

    constructor(protected loginData: string) {
        super();
    }

    protected executeInternal(): void {

        const userData: IGOWServerEmulatorUserVO = this.usersManager.createUser(this.loginData);

        const startGenerators: IGOWGeneratorStaticVO[] = GOWGeneratorsTools.getStartGenerators();
        for (let singleGenerator of startGenerators) {
            this.generatorsManager.buyGeneratorForUser(userData.id, singleGenerator.id);
        }

    }

}