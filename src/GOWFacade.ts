import {Point, HtmlTools} from "fsuite";

import {Facade} from "./appframework/facade/Facade";
import {GOWPreloaderModule} from "./modules/preloader/GOWPreloaderModule";
import {GOWAppModule} from "./modules/app/GOWAppModule";
import {RendererManager} from "./appframework/renderer/managers/RendererManager";
import {GOWGameModule} from "./modules/game/GOWGameModule";

export class GOWFacade extends Facade {

    protected addModules(): void {
        super.addModules();

        this.addSingleModule(new GOWAppModule());
        this.addSingleModule(new GOWPreloaderModule());
        this.addSingleModule(new GOWGameModule());
    }

}