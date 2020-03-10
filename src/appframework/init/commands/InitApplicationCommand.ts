import {
    QueueCommand
} from "fcore";

import {
    WaitGroupLoadingCompleteCommand
} from "fsuite";

import {LoadAppConfigCommand} from "../../../appframework/app/commands/LoadAppConfigCommand";
import {LoadLocalizaitonCommand} from "../../locales/commands/LoadLocalizaitonCommand";
import {InitLoadProcessCommand} from "../../../appframework/assets/commands/InitLoadProcessCommand";
import {LoadGroupName} from "../../../appframework/load/LoadGroupName";
import {ChangePageCommand} from "../../../appframework/pages/commands/ChangePageCommand";
import {PageId} from "../../../appframework/pages/PageId";
import {LoadStaticItemsCommand} from "../../app/commands/LoadStaticItemsCommand";

export class InitApplicationCommand extends QueueCommand {

    constructor() {
        super(
            [
                new LoadAppConfigCommand(),
                new LoadLocalizaitonCommand(),
                new LoadStaticItemsCommand(),

                new InitLoadProcessCommand(),
                new WaitGroupLoadingCompleteCommand(LoadGroupName.PRELOAD),

                new ChangePageCommand(PageId.PRELOADER_PAGE_ID)
            ]
        );
    }
}