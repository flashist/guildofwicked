import {BaseObject} from "fcore";
import {getInstance} from "fsuite";

import {GlobalEventDispatcher} from "../globaleventdispatcher/dispatcher/GlobalEventDispatcher";
import {IEventListenerCallback} from "../../../../fcore/src";

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

    addGlobalEventListener(type: string, listener: IEventListenerCallback): void {
        this.eventListenerHelper.addEventListener(
            this.globalDispatcher,
            type,
            listener
        );
    }

    removeGlobalEventListener(type: string, listener: IEventListenerCallback): void {
        this.eventListenerHelper.removeEventListener(
            this.globalDispatcher,
            type,
            listener
        );
    }
}