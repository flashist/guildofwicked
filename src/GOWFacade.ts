import {Facade} from "./appframework/facade/Facade";
import {GOWPreloaderModule} from "./modules/preloader/GOWPreloaderModule";
import {GOWAppModule} from "./modules/app/GOWAppModule";
import {GOWGameModule} from "./modules/game/GOWGameModule";
import {GOWUsersModule} from "./modules/users/GOWUsersModule";
import {GOWGeneratorsModule} from "./modules/generators/GOWGeneratorsModule";
import {GOWServerEmulatorModule} from "./modules/serveremulator/GOWServerEmulatorModule";
import {GOWInitModule} from "./modules/init/GOWInitModule";
import {GOWProductionModule} from "./modules/production/GOWProductionModule";

export class GOWFacade extends Facade {

    protected addModules(): void {
        super.addModules();

        this.addSingleModule(new GOWAppModule());
        this.addSingleModule(new GOWPreloaderModule());
        this.addSingleModule(new GOWGameModule());
        this.addSingleModule(new GOWUsersModule());
        this.addSingleModule(new GOWGeneratorsModule());
        this.addSingleModule(new GOWServerEmulatorModule());
        this.addSingleModule(new GOWInitModule());
        this.addSingleModule(new GOWProductionModule());
    }

}