import {BaseObject} from "fcore";
import {GLobalEventDispatcherEvent} from "./GlobalEventDispatcherEvent";
import {IGlobalDispatchEventVO} from "./IGlobalDispatchEventVO";

export class GlobalEventDispatcher extends BaseObject {

    dispatchEvent(event: string, ...args): void {
        super.dispatchEvent(event, ...args);

        //
        super.dispatchEvent(
            GLobalEventDispatcherEvent.DISPATCH_EVENT,
            {
                event: event,
                args: args
            } as IGlobalDispatchEventVO
        );
    }
}