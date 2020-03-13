import {Command} from "fcore";
import {IGOWGeneratorStaticVO} from "../../generators/data/IGOWGeneratorStaticVO";
import {GOWGeneratorsTools} from "../../generators/tools/GOWGeneratorsTools";
import {getInstance} from "fsuite";
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
            // this.generatorsManager.startProduction(userData.id, singleGenerator.id);
        }

    }

}