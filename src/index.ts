import {Facade} from "./appframework/facade/Facade";
import {GOWFacade} from "./GOWFacade";

Facade.init(
    {
        debug: true,
        FacadeClass: GOWFacade
    }
);