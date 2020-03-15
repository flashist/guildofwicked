import {InteractiveEvent} from "fsuite";

import {GOWGeneratorProductionManagersItemRendererView} from "./GOWGeneratorProductionManagersItemRendererView";
import {BaseMediator} from "../../../../../../appframework/base/mediators/BaseMediator";
import {GOWBuyUpgradeForGeneratorCommand} from "../../../../../generators/commands/GOWBuyUpgradeForGeneratorCommand";

export class GOWGeneratorProductionManagersItemRendererMediator extends BaseMediator<GOWGeneratorProductionManagersItemRendererView> {

    onActivatorStart(activator: GOWGeneratorProductionManagersItemRendererView): void {
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