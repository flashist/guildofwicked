import {Graphics} from "fsuite";

import {BaseView} from "../../../../../../appframework/base/views/BaseView";
import {IGOWUpgradeStaticVO} from "../../../../../upgrades/data/IGOWUpgradeStaticVO";
import {GOWSettings} from "../../../../../../GOWSettings";

export class GOWGeneratorProductionManagerIconItemRendererView extends BaseView<IGOWUpgradeStaticVO> {

    // Icon placeholder is used for test purpose, in real game cases each manager
    // would probably have their own icon
    protected iconPlaceholder: Graphics;

    protected construction(...args): void {
        super.construction(...args);

        this.iconPlaceholder = new Graphics();
        this.addChild(this.iconPlaceholder);
        //
        this.iconPlaceholder.beginFill(GOWSettings.colors.white);
        this.iconPlaceholder.lineStyle(2, GOWSettings.colors.black, 1, 0);
        this.iconPlaceholder.drawCircle(0, 0, 25);
        this.iconPlaceholder.endFill();
        // Improves vector circle graphics
        this.iconPlaceholder.cacheAsBitmap = true;
        //
        this.iconPlaceholder.x = this.iconPlaceholder.width / 2;
        this.iconPlaceholder.y = this.iconPlaceholder.height / 2;
    }

}