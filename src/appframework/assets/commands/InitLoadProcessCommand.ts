import {QueueCommand} from "@flashist/fcore";

import {LoadAssetsConfigCommand} from "./LoadAssetsConfigCommand";
import {ParseAssetsConfigCommand} from "./ParseAssetsConfigCommand";
import {AssetsStartLoadingCommand} from "./AssetsStartLoadingCommand";

export class InitLoadProcessCommand extends QueueCommand {
    constructor() {
        super(
            [
                new LoadAssetsConfigCommand(),
                new ParseAssetsConfigCommand(),
                new AssetsStartLoadingCommand()
            ] as any
        );
    }
}