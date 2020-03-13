import {getInstance, getText} from "fsuite";

import {InitApplicationDataCommand} from "../../../appframework/init/commands/InitApplicationDataCommand";
import {GOWInitServerRequestCommand} from "../../server/commands/GOWInitServerRequestCommand";
import {GOWUsersModel} from "../../users/models/GOWUsersModel";
import {IInitServerResponseVO} from "../../server/data/IInitServerResponseVO";
import {GOWTextTools} from "../../texts/tools/GOWTextTools";
import {IGOWResourceVO} from "../../resources/data/IGOWResourceVO";

export class GOWInitApplicationDataCommand extends InitApplicationDataCommand {

    protected usersModel: GOWUsersModel = getInstance(GOWUsersModel);

    protected executeInternal(): void {
        new GOWInitServerRequestCommand(this.usersModel.loginData)
            .execute()
            .then(
                (data: IInitServerResponseVO) => {
                    this.notifyComplete();
                }
            );
    }

}