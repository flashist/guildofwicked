import {ObjectsPool} from "fcore";
import {serviceLocatorAdd, ServiceLocatorObjectsPool} from "fsuite";

import {BaseModule} from "../base/modules/BaseModule";

export class ObjectsPoolModule extends BaseModule {
    init(): void {
        super.init();

        serviceLocatorAdd(ObjectsPool, {isSingleton: true});
        serviceLocatorAdd(ServiceLocatorObjectsPool, {toSubstitute: ObjectsPool});
    }
}