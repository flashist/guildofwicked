import {NumberTools} from "fcore";

import {
    Align, AutosizeType,
    BaseDataVOEvent,
    FContainer,
    FLabel, GenericObjectsByTypeModel,
    getInstance,
    getText,
    Graphics,
    Point,
    Sprite,
    Texture,
    VAlign
} from "fsuite";

import {BaseView} from "../../../../../../appframework/base/views/BaseView";
import {GOWGeneratorVO} from "../../../../../generators/data/GOWGeneratorVO";
import {GOWSettings} from "../../../../../../GOWSettings";
import {SimpleButtonView} from "../../../../../../appframework/display/views/button/SimpleButtonView";
import {IGetSizable} from "../../../../../../appframework/display/data/IGetSizable";
import {GOWGeneratorProductionProgressView} from "./GOWGeneratorProductionProgressView";
import {GOWTextTools} from "../../../../../texts/tools/GOWTextTools";
import {DateSettings} from "../../../../../../appframework/date/DateSettings";
import {GlobalEventDispatcher} from "../../../../../../appframework/globaleventdispatcher/dispatcher/GlobalEventDispatcher";
import {TimeModelEvent} from "../../../../../../appframework/time/models/TimeModelEvent";
import {GOWGeneratorProductionManagersView} from "./managers/GOWGeneratorProductionManagersView";
import {GOWGeneratorsTools} from "../../../../../generators/tools/GOWGeneratorsTools";
import {IGOWUpgradeStaticVO} from "../../../../../upgrades/data/IGOWUpgradeStaticVO";
import {GOWUpgradeTools} from "../../../../../upgrades/tools/GOWUpgradeTools";
import {GOWUpgradeType} from "../../../../../upgrades/data/GOWUpgradeType";
import {IGOWBonusStaticVO} from "../../../../../upgrades/data/IGOWBonusStaticVO";
import {GOWBonusStaticVOType} from "../../../../../upgrades/data/GOWBonusStaticVOType";

export class GOWGeneratorProductionItemRendererView extends BaseView<GOWGeneratorVO> implements IGetSizable {

    protected globalEventDispatcher: GlobalEventDispatcher;
    protected genericByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);

    protected bg: Graphics;

    public iconCont: FContainer;
    protected iconBg: Sprite;
    protected iconBgGlow: Sprite;
    protected icon: Sprite;

    protected amountLabel: FLabel;

    protected notBoughtCont: FContainer;
    public firstBuyBtn: SimpleButtonView;

    protected boughtCont: FContainer;
    protected progressBar: GOWGeneratorProductionProgressView;

    protected infoLabel: FLabel;

    protected timeBg: Graphics;
    protected timeLabel: FLabel;
    protected waitingLabel: FLabel;

    public buyNextLevelBtn: SimpleButtonView;
    public buyUpgradeBtn: SimpleButtonView;
    public upgradeToBuyData: IGOWUpgradeStaticVO;

    protected managersView: GOWGeneratorProductionManagersView;

    protected construction(...args): void {
        super.construction(...args);

        this.globalEventDispatcher = getInstance(GlobalEventDispatcher);

        this.bg = new Graphics();
        this.addChild(this.bg);

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

        this.amountLabel = new FLabel(
            {
                fontFamily: "Clarence",
                size: 32,
                color: GOWSettings.colors.black,
                align: Align.CENTER,
                valign: VAlign.MIDDLE,

                autosize: true,
                autosizeType: AutosizeType.HEIGHT,

                stroke: GOWSettings.colors.white,
                strokeThickness: 1.5,

                dropShadow: true,
                dropShadowColor: GOWSettings.colors.white,
                dropShadowDistance: 0,
                dropShadowBlur: 4
            }
        );
        this.iconCont.addChild(this.amountLabel);
        //
        this.amountLabel.width = this.iconBg.width;

        this.notBoughtCont = new FContainer();
        this.addChild(this.notBoughtCont);

        this.firstBuyBtn = new SimpleButtonView(
            {
                bgConfig: {
                    vector: {
                        bgColor: GOWSettings.colors.white,
                        overBgColor: GOWSettings.colors.yellow,
                        bgAlpha: 1,
                        bgBorderColor: GOWSettings.colors.black,
                        bgBorderAlpha: 1,
                        bgBorderWidth: 2
                    },
                    resizeBg: true
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
        this.notBoughtCont.addChild(this.firstBuyBtn);

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
        this.timeBg.lineStyle(2, GOWSettings.colors.black, 1, 0);
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
        this.timeLabel.fieldPadding = new Point(5, 5);
        this.timeLabel.width = this.timeBg.width;
        this.timeLabel.height = this.timeBg.height;

        this.waitingLabel = new FLabel(
            {
                fontFamily: "Clarence",
                size: 24,
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
        this.boughtCont.addChild(this.waitingLabel);
        //
        this.waitingLabel.fieldPadding = new Point(5, 5);
        this.waitingLabel.width = this.timeBg.width;
        this.waitingLabel.height = this.timeBg.height;
        //
        this.waitingLabel.text = getText("waiting");

        this.buyNextLevelBtn = new SimpleButtonView(
            {
                bgConfig: {
                    vector: {
                        bgColor: GOWSettings.colors.white,
                        overBgColor: GOWSettings.colors.yellow,
                        bgAlpha: 1,
                        bgBorderColor: GOWSettings.colors.black,
                        bgBorderAlpha: 1,
                        bgBorderWidth: 2
                    },
                    resizeBg: true
                },
                labelConfig: {
                    fontFamily: "Clarence",
                    size: 20,
                    color: GOWSettings.colors.black,
                    fitToSize: true,
                    fieldPadding: new Point(4, 0),
                    align: Align.CENTER,
                    valign: VAlign.MIDDLE
                }
            }
        );
        this.boughtCont.addChild(this.buyNextLevelBtn);
        //
        this.buyNextLevelBtn.resize(110, 50);

        this.buyUpgradeBtn = new SimpleButtonView(
            {
                bgConfig: {
                    vector: {
                        bgColor: GOWSettings.colors.white,
                        overBgColor: GOWSettings.colors.yellow,
                        bgAlpha: 1,
                        bgBorderColor: GOWSettings.colors.black,
                        bgBorderAlpha: 1,
                        bgBorderWidth: 2
                    },

                    resizeBg: true
                },
                labelConfig: {
                    fontFamily: "Clarence",
                    size: 20,
                    color: GOWSettings.colors.black,
                    fitToSize: true,
                    fieldPadding: new Point(4, 0),
                    align: Align.CENTER,
                    valign: VAlign.MIDDLE
                }
            }
        );
        this.boughtCont.addChild(this.buyUpgradeBtn);
        //
        this.buyUpgradeBtn.resize(215, 50);

        this.managersView = getInstance(GOWGeneratorProductionManagersView);
        this.boughtCont.addChild(this.managersView);
    }


    protected addListeners(): void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            this.globalEventDispatcher,
            TimeModelEvent.TIME_DATA_CHANGE,
            this.onTimeDataChange
        );
    }

    protected onTimeDataChange(): void {
        this.commitTimeData();
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
            this.iconCont.interactive = true;
            this.iconBgGlow.visible = true;

        } else {
            this.iconCont.interactive = false;
            this.iconBgGlow.visible = false;
        }

        this.progressBar.data = this.data;
        if (this.data.isProductionInProgress) {
            this.timeLabel.visible = true;
            this.waitingLabel.visible = false;

        } else {
            this.timeLabel.visible = false;
            this.waitingLabel.visible = true;
        }

        if (this.data.level > 0) {
            this.boughtCont.visible = true;
            this.notBoughtCont.visible = false;

            this.amountLabel.visible = true;
            this.amountLabel.text = this.data.level.toString();

            let infoLocaleId: string = "productionInfo";
            let visibleProductionValue: number = this.data.cumulativeProductionValue.value;
            if (this.data.cumulativeProductionDuration < DateSettings.MS_IN_SECOND / 2) {
                infoLocaleId = "productionInfoLessThenSec";
                visibleProductionValue = NumberTools.roundTo(
                    this.data.cumulativeProductionValue.value / (this.data.cumulativeProductionDuration / DateSettings.MS_IN_SECOND),
                    0.1
                );
            }
            this.infoLabel.text = getText(
                infoLocaleId,
                {
                    value: GOWTextTools.getFormattedResourceAmount(
                        {
                            type: this.data.cumulativeProductionValue.type,
                            value: visibleProductionValue
                        }
                    )
                }
            );

            const nextLevelPrice: number = GOWGeneratorsTools.calculateNextLevelPrice(
                this.data.static.basePrice.value,
                this.data.level,
                this.data.static.buyCoef
            );
            this.buyNextLevelBtn.text = getText(
                "buyNextLevelBtn",
                {
                    count: 1,
                    price: GOWTextTools.getFormattedResourceAmount(
                        {
                            type: this.data.static.basePrice.type,
                            value: nextLevelPrice
                        }
                    )
                }
            );

            const notBoughtUpgrades: IGOWUpgradeStaticVO[] = GOWUpgradeTools.findGeneratorUpgrades(
                this.data.static.id,
                {
                    upgradeType: GOWUpgradeType.UPGRADE,
                    bought: false
                }
            );

            if (notBoughtUpgrades && notBoughtUpgrades.length > 0) {
                this.upgradeToBuyData = notBoughtUpgrades[0];
                const firstAvailableBonus: IGOWBonusStaticVO = this.genericByTypeModel.getItem(
                    GOWBonusStaticVOType,
                    this.upgradeToBuyData.bonusId
                );

                this.buyUpgradeBtn.visible = true;
                this.buyUpgradeBtn.text = getText(
                    "buyUpgrade",
                    {
                        upgrade: getText(
                            firstAvailableBonus.localeId
                        ),
                        price: GOWTextTools.getFormattedResourceAmount(this.upgradeToBuyData.price)
                    }
                );

            } else {
                this.upgradeToBuyData = null;
                this.buyUpgradeBtn.visible = false;
            }

        } else {
            this.boughtCont.visible = false;
            this.notBoughtCont.visible = true;

            this.amountLabel.visible = false;

            this.firstBuyBtn.text = getText(
                "firstBuyButton",
                {
                    name: getText(this.data.static.localeId),
                    price: GOWTextTools.getFormattedResourceAmount(this.data.static.basePrice)
                }
            );
        }

        this.managersView.data = this.data;

        this.commitTimeData();

        this.arrange();
    }

    protected commitTimeData(): void {
        if (!this.data) {
            return;
        }

        this.progressBar.progressCoef = this.data.productionCompleteCoef;
        this.timeLabel.text = GOWTextTools.getFormattedDuration(this.data.productionTimeLeft);
    }

    protected arrange(): void {
        super.arrange();

        if (this.bg.width === this.resizeSize.x && this.bg.height === this.resizeSize.y) {
            return;
        }

        this.bg.clear();
        this.bg.beginFill(GOWSettings.colors.black);
        this.bg.drawRect(0, 0, this.resizeSize.x, this.resizeSize.y);
        this.bg.endFill();

        this.iconCont.x = this.bg.x + GOWSettings.layout.contentToBorderPadding;
        this.iconCont.y = this.bg.y + GOWSettings.layout.contentToBorderPadding;

        this.icon.x = this.iconBg.x + Math.floor((this.iconBg.width - this.icon.width) / 2);
        this.icon.y = this.iconBg.y + Math.floor((this.iconBg.height - this.icon.height) / 2);

        this.amountLabel.x = this.iconBg.x + Math.floor((this.iconBg.width - this.amountLabel.width) / 2);
        this.amountLabel.y = this.iconBg.y + this.iconBg.height - Math.floor(this.amountLabel.height / 2) - 4;

        this.firstBuyBtn.x = Math.floor(this.iconCont.x + this.iconBg.width + GOWSettings.layout.contentToBorderPadding);
        this.firstBuyBtn.y = Math.floor(this.iconCont.y);
        this.firstBuyBtn.resize(
            Math.floor(this.resizeSize.x - this.firstBuyBtn.x - GOWSettings.layout.contentToBorderPadding),
            this.iconBg.height
        );

        this.buyUpgradeBtn.x = Math.floor(this.resizeSize.x - this.buyUpgradeBtn.width - GOWSettings.layout.contentToBorderPadding);
        this.buyUpgradeBtn.y = Math.floor(this.resizeSize.y - this.buyUpgradeBtn.height - GOWSettings.layout.contentToBorderPadding);

        this.buyNextLevelBtn.x = Math.floor(this.resizeSize.x - this.buyNextLevelBtn.width - GOWSettings.layout.contentToBorderPadding);
        this.buyNextLevelBtn.y = this.iconCont.y;

        this.timeBg.x = this.buyUpgradeBtn.x;
        this.timeBg.y = this.buyNextLevelBtn.y;

        this.timeLabel.x = this.timeBg.x;
        this.timeLabel.y = this.timeBg.y;

        this.waitingLabel.x = this.timeBg.x;
        this.waitingLabel.y = this.timeBg.y;

        this.progressBar.x = Math.floor(this.iconCont.x + this.iconBg.width + GOWSettings.layout.contentToBorderPadding);
        this.progressBar.y = this.iconCont.y;
        //
        this.progressBar.resize(
            Math.floor(this.timeBg.x - this.progressBar.x - GOWSettings.layout.contentToBorderPadding),
            this.timeBg.height
        );

        this.infoLabel.x = this.progressBar.x;
        this.infoLabel.y = this.progressBar.y;
        this.infoLabel.width = this.progressBar.resizeSize.x;
        this.infoLabel.height = this.progressBar.resizeSize.y;

        this.managersView.x = this.progressBar.x;
        this.managersView.y = this.buyUpgradeBtn.y;
    }

    getSize(): Point {
        return this.resizeSize.clone();
    }

}