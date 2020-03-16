import {FContainer, getInstance} from "fsuite";

import {AppMainContainer} from "../../../appframework/app/views/AppMainContainer";
import {ContainersManager} from "../../../appframework/containers/managers/ContainersManager";
import {HintContainerId} from "../../../appframework/hints/data/HintContainerId";

export class GOWAppMainContainer extends AppMainContainer {

    protected containersManager: ContainersManager;

    protected construction(...args): void {
        super.construction(...args);

        this.containersManager = getInstance(ContainersManager);

        const tempCont: FContainer = new FContainer();
        this.addChild(tempCont);
        this.containersManager.addContainer(tempCont, HintContainerId);
    }

}