import {serviceLocatorAdd} from "fsuite";

import {BaseModule} from "../base/modules/BaseModule";
import {RendererManager} from "./managers/RendererManager";

export class RendererModule extends BaseModule {

    init(): void {
        super.init();

        serviceLocatorAdd(RendererManager, {isSingleton: true, forceCreation: true});
    }

}