import {
    BaseObject,
    ArrayTools,
    Logger
} from "fcore";

import {getInstance} from "fsuite";

import {GlobalEventDispatcher} from "../../globaleventdispatcher/dispatcher/GlobalEventDispatcher";

export abstract class BaseStrategy extends BaseObject {

    protected globalDispatcher: GlobalEventDispatcher;

    protected static cache: BaseStrategy[] = [];

    protected construction(...args): void {
        super.construction(args);

        this.globalDispatcher = getInstance(GlobalEventDispatcher);
    }

    activate(): void {
        console.log("BaseStrategy | activate __ this: ", this);

        if (BaseStrategy.cache.indexOf(this) == -1) {
            BaseStrategy.cache.push(this);
        }
    };

    deactivate(): void {
        this.eventListenerHelper.removeAllListeners();

        ArrayTools.removeItem(BaseStrategy.cache, this);
    }
}