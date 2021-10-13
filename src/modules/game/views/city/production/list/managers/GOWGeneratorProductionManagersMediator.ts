import {InteractiveEvent} from "@flashist/flibs";

import {GOWGeneratorProductionManagersView} from "./GOWGeneratorProductionManagersView";
import {BaseMediator} from "../../../../../../../appframework/base/mediators/BaseMediator";
import {GOWBuyUpgradeForGeneratorCommand} from "../../../../../../generators/commands/GOWBuyUpgradeForGeneratorCommand";

export class GOWGeneratorProductionManagersMediator extends BaseMediator<GOWGeneratorProductionManagersView> {

    onActivatorStart(activator: GOWGeneratorProductionManagersView): void {
        super.onActivatorStart(activator);

        this.eventListenerHelper.addEventListener(
            this.activator.buyBtn,
            InteractiveEvent.TAP,
            this.onBuy
        );
    }

    protected onBuy(): void {
        if (!this.activator.upgradeToBuyData) {
            return;
        }

        new GOWBuyUpgradeForGeneratorCommand(this.activator.upgradeToBuyData.id)
            .execute();
    }

}