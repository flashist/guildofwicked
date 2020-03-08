import {Logger, ConsoleCustomLoggerItem} from "fcore";
import {FApp} from "fsuite";
import {FC} from "fconsole";

import {BaseModule} from "../base/modules/BaseModule";

export class DebugModule extends BaseModule {
    activateCompleteHook(): void {
        super.activateCompleteHook();

        FC.startInit(
            FApp.instance.stage,
            {
                console: {
                    defaultVisible: true
                }
            }
        );

        Logger.addLoggerItem(new ConsoleCustomLoggerItem());
    }
}