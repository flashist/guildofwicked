import {Command} from "fcore";
import {GlobalEventDispatcher} from "../../globaleventdispatcher/dispatcher/GlobalEventDispatcher";
import {getInstance} from "fsuite";

export abstract class BaseAppCommand extends Command {

    protected globalDispatcher: GlobalEventDispatcher;

    protected construction(...args): void {
        super.construction(...args);

        this.globalDispatcher = getInstance(GlobalEventDispatcher);
    }

    dispatchEvent(event: string, ...args: any[]): void {
        super.dispatchEvent(event, ...args);

        // Redispatch event to the global level
        this.globalDispatcher.dispatchEvent(event, ...args);
    }

}