import {Sprite, Texture} from "fsuite";

import {BaseView} from "../../../../appframework/base/views/BaseView";
import {GOWGeneratorVO} from "../../../generators/data/GOWGeneratorVO";

export class GOWVisuzalizationItemRendererView extends BaseView<GOWGeneratorVO> {

    protected icon: Sprite;

    protected construction(...args): void {
        super.construction(...args);

        this.icon = new Sprite();
        this.addChild(this.icon);
    }


    protected commitData(): void {
        super.commitData();

        if (!this.data) {
            return;
        }

        this.icon.texture = Texture.from(this.data.static.icon);

        this.arrange();
    }

    protected arrange(): void {
        super.arrange();

        this.icon.x = -1 * Math.floor(this.icon.width / 2);
        this.icon.y = -1 * Math.floor(this.icon.height / 2);
    }
}