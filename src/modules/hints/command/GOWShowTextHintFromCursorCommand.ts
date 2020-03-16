import {Point} from "fsuite";

import {GOWShowTextHintCommand} from "./GOWShowTextHintCommand";
import {Facade} from "../../../appframework/facade/Facade";

export class GOWShowTextHintFromCursorCommand extends GOWShowTextHintCommand {

    constructor(text: string) {
        super(text);

        const globalCursorPos: Point = Facade.instance.app.getGlobalInteractionPosition();
        globalCursorPos.y -= 20;
        this.config = {
            startGlobalPos: globalCursorPos
        };
    }
}