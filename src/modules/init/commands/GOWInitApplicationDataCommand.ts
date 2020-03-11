import {InitApplicationDataCommand} from "../../../appframework/init/commands/InitApplicationDataCommand";
import {GOWInitServerRequestCommand} from "../../server/commands/GOWInitServerRequestCommand";
import {GOWUsersModel} from "../../users/models/GOWUsersModel";
import {getInstance} from "fsuite";

export class GOWInitApplicationDataCommand extends InitApplicationDataCommand {

    protected usersModel: GOWUsersModel = getInstance(GOWUsersModel);

    protected executeInternal(): void {
        new GOWInitServerRequestCommand(this.usersModel.loginData)
            .execute()
            .then(
                () => {
                    this.notifyComplete();
                }
            )
    }

}