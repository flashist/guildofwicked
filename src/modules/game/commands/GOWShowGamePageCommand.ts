import {BaseAppCommand} from "../../../appframework/base/commands/BaseAppCommand";
import {QueueCommand} from "fcore";
import {ChangePageCommand} from "../../../appframework/pages/commands/ChangePageCommand";
import {PageId} from "../../../appframework/pages/PageId";
import {GOWShowOfflineProductionInfoCommand} from "./GOWShowOfflineProductionInfoCommand";
import {GOWProductionManager} from "../../production/managers/GOWProductionManager";
import {getInstance} from "fsuite";

export class GOWShowGamePageCommand extends BaseAppCommand {

    protected productionManager: GOWProductionManager = getInstance(GOWProductionManager);

    protected executeInternal(): void {
        new QueueCommand([
            new ChangePageCommand(PageId.GAME_PAGE_ID),
            new GOWShowOfflineProductionInfoCommand()
        ])
            .execute()
            .then(
                () => {
                    this.productionManager.isActive = true;

                    this.notifyComplete();
                }
            );
    }

}