import {getInstance, Graphics} from "fsuite";

import {BaseView} from "../../../../appframework/base/views/BaseView";
import {GOWSettings} from "../../../../GOWSettings";
import {GOWUsersModel} from "../../../users/models/GOWUsersModel";

export class GOWGamePageVisualizationView extends BaseView {

    protected bg: Graphics;

    protected construction(...args): void {
        super.construction(...args);

        this.bg = new Graphics();
        this.addChild(this.bg);
        //
        this.bg.beginFill(GOWSettings.colors.red);
        this.bg.drawRect(0, 0, 100, 100);
        this.bg.endFill();
    }


    protected addListeners(): void {
        super.addListeners();

    }

    protected commitData(): void {
        super.commitData();

    }

    protected arrange(): void {
        super.arrange();

        this.bg.width = this.resizeSize.x;
        this.bg.height = this.resizeSize.y;
    }
}