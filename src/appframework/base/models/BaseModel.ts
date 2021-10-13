import {getInstance, GenericObjectsModel, IGenericObjectVO} from "@flashist/flibs";

import {GlobalEventDispatcher} from "../../globaleventdispatcher/dispatcher/GlobalEventDispatcher";

// export class BaseModel extends BaseObject {
export class BaseModel<ItemType extends IGenericObjectVO = IGenericObjectVO> extends GenericObjectsModel<ItemType> {

    protected globalDispatcher: GlobalEventDispatcher;

    protected construction(...args): void {
        this.globalDispatcher = getInstance(GlobalEventDispatcher);

        super.construction(...args);
    }

    dispatchEvent(event: string, ...args: any[]): void {
        super.dispatchEvent(event, ...args);

        // Redispatch event to the global level
        this.globalDispatcher.dispatchEvent(event, ...args);
    }

}