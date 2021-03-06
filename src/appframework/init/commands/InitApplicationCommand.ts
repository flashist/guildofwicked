import {
    QueueCommand
} from "fcore";

import {
    getInstance,
    WaitGroupLoadingCompleteCommand
} from "fsuite";

import {LoadAppConfigCommand} from "../../../appframework/app/commands/LoadAppConfigCommand";
import {LoadLocalizaitonCommand} from "../../locales/commands/LoadLocalizaitonCommand";
import {InitLoadProcessCommand} from "../../../appframework/assets/commands/InitLoadProcessCommand";
import {LoadGroupName} from "../../../appframework/load/LoadGroupName";
import {ChangePageCommand} from "../../../appframework/pages/commands/ChangePageCommand";
import {PageId} from "../../../appframework/pages/PageId";
import {LoadStaticItemsCommand} from "../../app/commands/LoadStaticItemsCommand";
import {InitApplicationDataCommand} from "./InitApplicationDataCommand";

export class InitApplicationCommand extends QueueCommand {

    constructor() {
        super(
            [
                getInstance(LoadAppConfigCommand),
                getInstance(LoadLocalizaitonCommand),
                getInstance(LoadStaticItemsCommand),

                getInstance(InitLoadProcessCommand),
                getInstance(WaitGroupLoadingCompleteCommand, LoadGroupName.PRELOAD),

                getInstance(InitApplicationDataCommand),

                getInstance(ChangePageCommand, PageId.PRELOADER_PAGE_ID)
            ]
        );
    }
}