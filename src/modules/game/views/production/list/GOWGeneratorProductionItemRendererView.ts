import {BaseView} from "../../../../../appframework/base/views/BaseView";
import {GOWGeneratorVO} from "../../../../generators/data/GOWGeneratorVO";
import {Align, BaseDataVOEvent, FContainer, getText, Graphics, Point, Sprite, Texture, VAlign} from "fsuite";
import {GOWSettings} from "../../../../../GOWSettings";
import {SimpleButtonView} from "../../../../../appframework/display/views/button/SimpleButtonView";
import {IGetSizable} from "../../../../../appframework/display/data/IGetSizable";
import {GOWResourcesTools} from "../../../../resources/tools/GOWResourcesTools";
import {GOWResourceType} from "../../../../resources/data/GOWResourceType";

export class GOWGeneratorProductionItemRendererView extends BaseView<GOWGeneratorVO> implements IGetSizable {

    protected bg: Graphics;

    protected iconCont: FContainer;
    protected iconBg: Sprite;
    protected iconBgGlow: Sprite;
    protected icon: Sprite;

    protected firstBuyButton: SimpleButtonView;

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

        this.firstBuyButton = new SimpleButtonView(
            {
                bgConfig: {
                    bgColor: GOWSettings.colors.white,
                    bgAlpha: 1,
                    bgBorderColor: GOWSettings.colors.black,
                    bgBorderAlpha: 1,
                    bgBorderWidth: 2
                },
                labelConfig: {
                    fontFamily: "Clarence",
                    size: 36,
                    color: GOWSettings.colors.black,
                    autosize: true,
                    align: Align.CENTER,
                    valign: VAlign.MIDDLE
                }
            }
        );
        this.addChild(this.firstBuyButton);
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
        if (this.data.static.index % 2 === 0) {
            this.bg.alpha = 0;
        } else {
            this.bg.alpha = 0.25;
        }

        if (this.data.isNextProductionAvailable) {
            this.iconBgGlow.visible = true;
        } else {
            this.iconBgGlow.visible = false;
        }

        if (this.data.level > 0) {
            this.firstBuyButton.visible = false;
        } else {
            this.firstBuyButton.text = getText(
                "firstBuyButton",
                {
                    name: getText(this.data.static.localeId),
                    price: GOWResourcesTools.getFormattedResourceAmount(
                        this.data.static.basePrice,
                        GOWResourceType.MONEY
                    )
                }
            )
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

        this.firstBuyButton.x = this.iconCont.x + this.iconBg.width + GOWSettings.layout.contentToBorderPadding;
        this.firstBuyButton.y = this.iconCont.y;
        this.firstBuyButton.resize(
            this.resizeSize.x - this.firstBuyButton.x - GOWSettings.layout.contentToBorderPadding,
            this.iconBg.height
        )
    }

    getSize(): Point {
        return this.resizeSize.clone();
    }
}