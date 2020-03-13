import {BaseAppCommand} from "../../../appframework/base/commands/BaseAppCommand";
import {QueueCommand} from "fcore";
import {ChangePageCommand} from "../../../appframework/pages/commands/ChangePageCommand";
import {PageId} from "../../../appframework/pages/PageId";
import {GOWShowOfflineProductionInfoCommand} from "./GOWShowOfflineProductionInfoCommand";

export class GOWShowGamePageCommand extends BaseAppCommand {

    protected executeInternal(): void {
        new QueueCommand([
            new ChangePageCommand(PageId.GAME_PAGE_ID),
            new GOWShowOfflineProductionInfoCommand()
        ])
            .execute()
            .then(
                () => {
                    this.notifyComplete();
                }
            );
    }

}