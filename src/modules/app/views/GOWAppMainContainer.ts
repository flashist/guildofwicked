import {FContainer, getInstance} from "fsuite";

import {AppMainContainer} from "../../../appframework/app/views/AppMainContainer";
import {ContainersManager} from "../../../appframework/containers/managers/ContainersManager";
import {HintContainerId} from "../../../appframework/hints/data/HintContainerId";
import {GOWSimplePopupView} from "./GOWSimplePopupView";

export class GOWAppMainContainer extends AppMainContainer {

    protected containersManager: ContainersManager;
    protected simplePopup: GOWSimplePopupView;

    protected construction(...args): void {
        super.construction(...args);

        this.containersManager = getInstance(ContainersManager);

        this.simplePopup = getInstance(GOWSimplePopupView);
        this.addChild(this.simplePopup);

        const tempCont: FContainer = new FContainer();
        this.addChild(tempCont);
        this.containersManager.addContainer(tempCont, HintContainerId);
    }

    protected arrange(): void {
        super.arrange();

        this.simplePopup.resize(this.resizeSize.x, this.resizeSize.y);
    }
}