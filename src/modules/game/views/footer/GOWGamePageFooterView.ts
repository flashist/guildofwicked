import {Graphics} from "fsuite";

import {BaseView} from "../../../../appframework/base/views/BaseView";
import {GOWSettings} from "../../../../GOWSettings";

export class GOWGamePageFooterView extends BaseView {

    protected bg: Graphics;

    protected construction(...args): void {
        super.construction(...args);

        this.bg = new Graphics();
        this.addChild(this.bg);
        //
        this.bg.beginFill(GOWSettings.colors.grey);
        this.bg.drawRect(0, 0, 100, 100);
        this.bg.endFill();
    }

    protected arrange(): void {
        super.arrange();

        this.bg.width = this.resizeSize.x;
        this.bg.height = this.resizeSize.y;
    }
}