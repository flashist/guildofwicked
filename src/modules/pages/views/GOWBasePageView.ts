import {Graphics} from "fsuite";

import {BasePageView} from "../../../appframework/pages/views/BasePageView";

export class GOWBasePageView extends BasePageView {

    protected bg: Graphics;
    protected bgColor: number = 0x000000;

    protected construction(...args): void {
        super.construction(...args);

        this.bg = new Graphics();
        this.addChildBefore(this.bg, this.contentCont);
        //
        this.bg.beginFill(this.bgColor);
        this.bg.drawRect(0, 0, 100, 100);
        this.bg.endFill();
        //
        this.bg.interactive = false;
    }

    protected arrange(): void {
        super.arrange();

        this.bg.width = this.resizeSize.x;
        this.bg.height = this.resizeSize.y;
    }
}