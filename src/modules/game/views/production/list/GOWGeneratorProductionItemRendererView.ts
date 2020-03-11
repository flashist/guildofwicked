import {BaseView} from "../../../../../appframework/base/views/BaseView";
import {GOWGeneratorVO} from "../../../../generators/data/GOWGeneratorVO";
import {FContainer, Graphics, Sprite, Texture} from "fsuite";
import {GOWSettings} from "../../../../../GOWSettings";

export class GOWGeneratorProductionItemRendererView extends BaseView<GOWGeneratorVO> {

    protected bg: Graphics;

    protected iconCont: FContainer;
    protected iconBg: Sprite;
    protected iconBgGlow: Sprite;
    protected icon: Sprite;

    protected construction(...args): void {
        super.construction(...args);

        this.bg = new Graphics();
        this.addChild(this.bg);
        //
        this.bg.beginFill(GOWSettings.colors.black);
        this.bg.drawRect(0, 0, 100, 100);
        this.bg.endFill();

        this.iconCont = new FContainer();
        this.addChild(this.iconCont);

        this.iconBgGlow = Sprite.from("production-icon-bg-glow.png");
        this.iconCont.addChild(this.iconBgGlow);

        this.iconBg = Sprite.from("production-icon-bg.png");
        this.iconCont.addChild(this.iconBg);

        this.iconBgGlow.x = this.iconBg.x + Math.floor((this.iconBg.width - this.iconBgGlow.width) / 2);
        this.iconBgGlow.y = this.iconBg.y + Math.floor((this.iconBg.height - this.iconBgGlow.height) / 2);

        this.icon = new Sprite();
        this.iconCont.addChild(this.icon);
    }

    protected commitData(): void {
        super.commitData();

        if (!this.data) {
            return;
        }

        this.icon.texture = Texture.from(this.data.static.icon);
        if (this.data.static.index % 2 === 0) {
            this.bg.alpha = 0;
        } else {
            this.bg.alpha = 0.25;
        }

        this.arrange();
    }

    protected arrange(): void {
        super.arrange();

        this.bg.width = this.resizeSize.x;
        this.bg.height = this.resizeSize.y;

        this.iconCont.x = this.bg.x + GOWSettings.layout.contentToBorderPadding;
        this.iconCont.y = this.bg.y + GOWSettings.layout.contentToBorderPadding;

        this.icon.x = this.iconBg.x + Math.floor((this.iconBg.width - this.icon.width) / 2);
        this.icon.y = this.iconBg.y + Math.floor((this.iconBg.height - this.icon.height) / 2);
    }

}