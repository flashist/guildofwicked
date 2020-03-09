import {
    QueueCommand
} from "fcore";

import {
    WaitGroupLoadingCompleteCommand
} from "fsuite";

import {LoadAppConfigCommand} from "../../../appframework/app/commands/LoadAppConfigCommand";
import {InitLocalesCommand} from "../../../appframework/locales/commands/InitLocalesCommand";
import {InitLoadProcessCommand} from "../../../appframework/assets/commands/InitLoadProcessCommand";
import {LoadGroupName} from "../../../appframework/load/LoadGroupName";
import {DispatchGlobalEventCommand} from "../../../appframework/events/commands/DispatchGlobalEventCommand";
import {AppEvent} from "../../../appframework/app/event/AppEvent";
import {ChangePageCommand} from "../../../appframework/pages/commands/ChangePageCommand";
import {PageId} from "../../../appframework/pages/PageId";

export class InitApplicationCommand extends QueueCommand {

    constructor() {
        super(
            [
                new LoadAppConfigCommand(),

                new InitLocalesCommand(),

                new InitLoadProcessCommand(),
                new WaitGroupLoadingCompleteCommand(LoadGroupName.PRELOAD),

                new DispatchGlobalEventCommand(AppEvent.PRELOADER_PAGE_READY),
                new ChangePageCommand(PageId.PRELOADER_PAGE_ID),
                new DispatchGlobalEventCommand(AppEvent.PRELOADER_PAGE_SHOWN)
            ]
        );
    }
}