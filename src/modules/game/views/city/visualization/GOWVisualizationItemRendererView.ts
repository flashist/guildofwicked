import {BaseDataVOEvent, Sprite, Texture} from "fsuite";

import {BaseView} from "../../../../../appframework/base/views/BaseView";
import {GOWGeneratorVO} from "../../../../generators/data/GOWGeneratorVO";

export class GOWVisualizationItemRendererView extends BaseView<GOWGeneratorVO> {

    protected icon: Sprite;

    protected construction(...args): void {
        super.construction(...args);

        this.icon = new Sprite();
        this.addChild(this.icon);
    }


    protected processDataUnset(value: GOWGeneratorVO): void {
        super.processDataUnset(value);

        if (!value) {
            return;
        }

        this.eventListenerHelper.removeAllListeners(value);
    }

    protected processDataSet(value: GOWGeneratorVO): void {
        super.processDataSet(value);

        if (!value) {
            return;
        }

        this.eventListenerHelper.addEventListener(
            value,
            BaseDataVOEvent.CHANGE,
            this.onDataChange
        );
    }

    protected onDataChange(): void {
        this.commitData();
    }


    protected commitData(): void {
        super.commitData();

        if (!this.data) {
            return;
        }

        this.icon.texture = Texture.from(this.data.static.icon);
        if (this.data.level > 0) {
            this.icon.alpha = 1;
        } else {
            this.icon.alpha = 0.5;
        }

        this.arrange();
    }

    protected arrange(): void {
        super.arrange();

        this.icon.x = -1 * Math.floor(this.icon.width / 2);
        this.icon.y = -1 * Math.floor(this.icon.height / 2);
    }
}