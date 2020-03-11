import {BaseObject} from "fcore";
import {getInstance} from "fsuite";

import {GlobalEventDispatcher} from "../globaleventdispatcher/dispatcher/GlobalEventDispatcher";

export class BaseObjectWithGlobalDispatcher extends BaseObject {

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