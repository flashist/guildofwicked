import {InteractiveEvent} from "fsuite";

import {BaseMediator} from "../../../../../../appframework/base/mediators/BaseMediator";
import {GOWGeneratorProductionItemRendererView} from "./GOWGeneratorProductionItemRendererView";
import {GOWGeneratorStartProductionClientCommand} from "../../../../../generators/commands/GOWGeneratorStartProductionClientCommand";
import {GOWBuyGeneratorCommand} from "../../../../../generators/commands/GOWBuyGeneratorCommand";
import {GOWBuyUpgradeForGeneratorCommand} from "../../../../../generators/commands/GOWBuyUpgradeForGeneratorCommand";

export class GOWGeneratorProductionItemRendererMediator extends BaseMediator<GOWGeneratorProductionItemRendererView> {

    onActivatorStart(activator: GOWGeneratorProductionItemRendererView): void {
        super.onActivatorStart(activator);

        this.eventListenerHelper.addEventListener(
            this.activator.iconCont,
            InteractiveEvent.TAP,
            this.onIconTap
        );

        this.eventListenerHelper.addEventListener(
            this.activator.firstBuyBtn,
            InteractiveEvent.TAP,
            this.onBuyGenerator
        );

        this.eventListenerHelper.addEventListener(
            this.activator.buyNextLevelBtn,
            InteractiveEvent.TAP,
            this.onBuyGenerator
        );

        this.eventListenerHelper.addEventListener(
            this.activator.buyUpgradeBtn,
            InteractiveEvent.TAP,
            this.onBuyUpgrade
        );
    }

    protected onIconTap(): void {
        new GOWGeneratorStartProductionClientCommand(this.activator.data.id)
            .execute();
    }

    protected onBuyGenerator(): void {
        new GOWBuyGeneratorCommand(this.activator.data.id)
            .execute();
    }

    protected onBuyUpgrade(): void {
        if (!this.activator.upgradeToBuyData) {
            return;
        }

        new GOWBuyUpgradeForGeneratorCommand(this.activator.upgradeToBuyData.id)
            .execute();
    }
}