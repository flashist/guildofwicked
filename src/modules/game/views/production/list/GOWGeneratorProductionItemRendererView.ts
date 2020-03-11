import {BaseView} from "../../../../../appframework/base/views/BaseView";
import {GOWGeneratorVO} from "../../../../generators/data/GOWGeneratorVO";
import {Align, BaseDataVOEvent, FContainer, FLabel, getText, Graphics, Point, Sprite, Texture, VAlign} from "fsuite";
import {GOWSettings} from "../../../../../GOWSettings";
import {SimpleButtonView} from "../../../../../appframework/display/views/button/SimpleButtonView";
import {IGetSizable} from "../../../../../appframework/display/data/IGetSizable";
import {GOWResourceType} from "../../../../resources/data/GOWResourceType";
import {GOWGeneratorProductionProgressView} from "./GOWGeneratorProductionProgressView";
import {GOWTextTools} from "../../../../texts/tools/GOWTextTools";

export class GOWGeneratorProductionItemRendererView extends BaseView<GOWGeneratorVO> implements IGetSizable {

    protected bg: Graphics;

    protected iconCont: FContainer;
    protected iconBg: Sprite;
    protected iconBgGlow: Sprite;
    protected icon: Sprite;

    protected notBoughtCont: FContainer;
    protected firstBuyButton: SimpleButtonView;

    protected boughtCont: FContainer;
    protected progressBar: GOWGeneratorProductionProgressView;

    protected infoLabel: FLabel;

    protected timeBg: Graphics;
    protected timeLabel: FLabel;

    protected buyBtn: SimpleButtonView;
    protected upgradeBtn: SimpleButtonView;

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

        this.notBoughtCont = new FContainer();
        this.addChild(this.notBoughtCont);

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
        this.notBoughtCont.addChild(this.firstBuyButton);

        this.boughtCont = new FContainer();
        this.addChild(this.boughtCont);

        this.progressBar = new GOWGeneratorProductionProgressView();
        this.boughtCont.addChild(this.progressBar);

        this.infoLabel = new FLabel(
            {
                fontFamily: "Clarence",
                size: 36,
                color: GOWSettings.colors.black,
                align: Align.CENTER,
                valign: VAlign.MIDDLE,

                stroke: GOWSettings.colors.white,
                strokeThickness: 1.5,

                dropShadow: true,
                dropShadowColor: GOWSettings.colors.white,
                dropShadowDistance: 0,
                dropShadowBlur: 4
            }
        );
        this.boughtCont.addChild(this.infoLabel);

        this.timeBg = new Graphics();
        this.boughtCont.addChild(this.timeBg);
        //
        this.timeBg.beginFill(GOWSettings.colors.white);
        this.timeBg.lineStyle(2, GOWSettings.colors.black);
        this.timeBg.drawRect(0, 0, 90, 50);
        this.timeBg.endFill();

        this.timeLabel = new FLabel(
            {
                fontFamily: "Clarence",
                size: 36,
                color: GOWSettings.colors.black,
                align: Align.CENTER,
                valign: VAlign.MIDDLE,

                stroke: GOWSettings.colors.white,
                strokeThickness: 1.5,

                dropShadow: true,
                dropShadowColor: GOWSettings.colors.white,
                dropShadowDistance: 0,
                dropShadowBlur: 4
            }
        );
        this.boughtCont.addChild(this.timeLabel);
        //
        this.timeLabel.width = this.timeBg.width;
        this.timeLabel.height = this.timeBg.height;

        this.buyBtn = new SimpleButtonView(
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
                    size: 24,
                    color: GOWSettings.colors.black,
                    autosize: true,
                    align: Align.CENTER,
                    valign: VAlign.MIDDLE
                }
            }
        );
        this.boughtCont.addChild(this.buyBtn);
        //
        this.buyBtn.resize(110, 50);

        this.upgradeBtn = new SimpleButtonView(
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
                    size: 24,
                    color: GOWSettings.colors.black,
                    autosize: true,
                    align: Align.CENTER,
                    valign: VAlign.MIDDLE
                }
            }
        );
        this.boughtCont.addChild(this.upgradeBtn);
        //
        this.upgradeBtn.resize(215, 50);
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
            this.boughtCont.visible = true;
            this.notBoughtCont.visible = false;

            this.infoLabel.text = getText(
                "productionInfo",
                {
                    value: GOWTextTools.getFormattedResourceAmount(
                        this.data.static.productionValue.value,
                        this.data.static.productionValue.resourceType
                    )
                }
            );

        } else {
            this.boughtCont.visible = false;
            this.notBoughtCont.visible = true;

            this.firstBuyButton.text = getText(
                "firstBuyButton",
                {
                    name: getText(this.data.static.localeId),
                    price: GOWTextTools.getFormattedResourceAmount(
                        this.data.static.basePrice,
                        GOWResourceType.MONEY
                    )
                }
            );
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

        this.firstBuyButton.x = Math.floor(this.iconCont.x + this.iconBg.width + GOWSettings.layout.contentToBorderPadding);
        this.firstBuyButton.y = Math.floor(this.iconCont.y);
        this.firstBuyButton.resize(
            Math.floor(this.resizeSize.x - this.firstBuyButton.x - GOWSettings.layout.contentToBorderPadding),
            this.iconBg.height
        );

        this.upgradeBtn.x = Math.floor(this.resizeSize.x - this.upgradeBtn.width - GOWSettings.layout.contentToBorderPadding);
        this.upgradeBtn.y = Math.floor(this.resizeSize.y - this.upgradeBtn.height - GOWSettings.layout.contentToBorderPadding);

        this.buyBtn.x = Math.floor(this.resizeSize.x - this.buyBtn.width - GOWSettings.layout.contentToBorderPadding);
        this.buyBtn.y = this.iconCont.y;

        this.timeBg.x = this.upgradeBtn.x;
        this.timeBg.y = this.buyBtn.y;

        this.timeLabel.x = this.timeBg.x;
        this.timeLabel.y = this.timeBg.y;

        this.progressBar.x = Math.floor(this.iconCont.x + this.iconBg.width + GOWSettings.layout.contentToBorderPadding);
        this.progressBar.y = this.iconCont.y;
        //
        this.progressBar.resize(
            Math.floor(this.timeBg.x - this.progressBar.x - GOWSettings.layout.contentToBorderPadding),
            this.timeBg.height
        );

        this.infoLabel.x = this.progressBar.x;
        this.infoLabel.y = this.progressBar.y;
        this.infoLabel.width = this.progressBar.width;
        this.infoLabel.height = this.progressBar.height;
    }

    getSize(): Point {
        return this.resizeSize.clone();
    }

}