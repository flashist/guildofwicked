import {Graphics} from "fsuite";

import {BaseView} from "../../../../../../appframework/base/views/BaseView";
import {GOWSettings} from "../../../../../../GOWSettings";
import {GOWGeneratorVO} from "../../../../../generators/data/GOWGeneratorVO";
import {GOWResourceType} from "../../../../../resources/data/GOWResourceType";

export class GOWGeneratorProductionProgressView extends BaseView<GOWGeneratorVO> {

    protected progressBg: Graphics;
    protected progressBar: Graphics;
    protected progressBarMask: Graphics;

    private _progressCoef: number;

    protected construction(...args): void {
        super.construction(...args);

        this._progressCoef = 0;

        this.progressBg = new Graphics();
        this.addChild(this.progressBg);

        this.progressBar = new Graphics();
        this.addChild(this.progressBar);

        this.progressBarMask = new Graphics();
        this.addChild(this.progressBarMask);
        //
        this.progressBarMask.beginFill(0xFF0000);
        this.progressBarMask.drawRect(0, 0, 100, 100);
        this.progressBarMask.endFill();
        //
        this.progressBar.mask = this.progressBarMask;
    }

    protected commitProgressData(): void {
        this.progressBarMask.width = Math.floor(this.progressBar.width * this.progressCoef);
        this.progressBarMask.height = this.progressBar.height;
    }

    protected arrange(): void {
        super.arrange();

        if (!this.data) {
            return;
        }

        let progressColor: number;
        if (this.data.static.resource === GOWResourceType.MONEY) {
            progressColor = GOWSettings.colors.green;
        } else {
            progressColor = GOWSettings.colors.red;
        }

        this.fillRect(this.progressBg, GOWSettings.colors.white, this.resizeSize.x, this.resizeSize.y);
        this.fillRect(this.progressBar, progressColor, this.resizeSize.x, this.resizeSize.y);

        this.commitProgressData();
    }

    protected fillRect(graphics: Graphics, color: number, rectWidth: number, rectHeight: number): void {
        graphics.clear();
        graphics.beginFill(color);
        graphics.lineStyle(2, GOWSettings.colors.black, 1, 0);
        graphics.drawRect(0, 0, rectWidth, rectHeight);
        graphics.endFill();
    }

    get progressCoef(): number {
        return this._progressCoef;
    }
    set progressCoef(value: number) {
        if (value === this.progressCoef) {
            return;
        }

        this._progressCoef = value;

        this.commitProgressData();
    }
}