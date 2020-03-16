import {Align, BaseDataVOEvent, GenericObjectsByTypeModel, getInstance, getText, VAlign} from "fsuite";

import {BaseView} from "../../../../../../../appframework/base/views/BaseView";
import {SimpleButtonView} from "../../../../../../../appframework/display/views/button/SimpleButtonView";
import {GOWGeneratorVO} from "../../../../../../generators/data/GOWGeneratorVO";
import {IGOWUpgradeStaticVO} from "../../../../../../upgrades/data/IGOWUpgradeStaticVO";
import {GOWUpgradeTools} from "../../../../../../upgrades/tools/GOWUpgradeTools";
import {GOWUpgradeType} from "../../../../../../upgrades/data/GOWUpgradeType";
import {SimpleList} from "../../../../../../../appframework/display/views/simplelist/SimpleList";
import {BaseLayout} from "../../../../../../../appframework/display/views/layout/BaseLayout";
import {GOWGeneratorProductionManagerIconItemRendererView} from "./GOWGeneratorProductionManagerIconItemRendererView";
import {RowLayout} from "../../../../../../../appframework/display/views/layout/RowLayout";
import {IGOWBonusStaticVO} from "../../../../../../upgrades/data/IGOWBonusStaticVO";
import {GOWBonusStaticVOType} from "../../../../../../upgrades/data/GOWBonusStaticVOType";
import {GOWTextTools} from "../../../../../../texts/tools/GOWTextTools";
import {GOWSettings} from "../../../../../../../GOWSettings";

export class GOWGeneratorProductionManagersView extends BaseView<GOWGeneratorVO> {

    protected genericByTypeModel: GenericObjectsByTypeModel;

    protected managerIconsList: SimpleList;
    protected managerIconsListLayout: BaseLayout;

    public buyBtn: SimpleButtonView;
    public upgradeToBuyData: IGOWUpgradeStaticVO;

    protected construction(...args): void {
        super.construction(...args);

        this.genericByTypeModel = getInstance(GenericObjectsByTypeModel);

        this.managerIconsList = new SimpleList();
        this.addChild(this.managerIconsList);
        //
        this.managerIconsList.ItemRendererClass = GOWGeneratorProductionManagerIconItemRendererView;
        //
        this.managerIconsListLayout = new RowLayout({spacingX: -40});

        this.buyBtn = new SimpleButtonView(
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
                    autosize: true,
                    align: Align.CENTER,
                    valign: VAlign.MIDDLE
                }
            }
        );
        this.addChild(this.buyBtn);
        //
        this.buyBtn.resize(210, 50);
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

        const boughtUpgrades: IGOWUpgradeStaticVO[] = GOWUpgradeTools.findGeneratorUpgrades(
            this.data.static.id,
            {
                upgradeType: GOWUpgradeType.MANAGER,
                bought: true
            }
        );
        this.managerIconsList.dataProvider = boughtUpgrades;
        if (this.managerIconsList.dataProvider.length > 0) {
            this.managerIconsList.visible = true;
        } else {
            this.managerIconsList.visible = false;
        }

        const notBoughtUpgrades: IGOWUpgradeStaticVO[] = GOWUpgradeTools.findGeneratorUpgrades(
            this.data.static.id,
            {
                upgradeType: GOWUpgradeType.MANAGER,
                bought: false
            }
        );

        if (notBoughtUpgrades && notBoughtUpgrades.length > 0) {
            this.upgradeToBuyData = notBoughtUpgrades[0];
            const firstAvailableBonus: IGOWBonusStaticVO = this.genericByTypeModel.getItem(
                GOWBonusStaticVOType,
                this.upgradeToBuyData.bonusId
            );

            this.buyBtn.visible = true;
            this.buyBtn.text = getText(
                "hireManager",
                {
                    upgrade: getText(
                        firstAvailableBonus.localeId
                    ),
                    price: GOWTextTools.getFormattedResourceAmount(this.upgradeToBuyData.price)
                }
            );

        } else {
            this.upgradeToBuyData = null;
            this.buyBtn.visible = false;
        }

        this.arrange();
    }

    protected arrange(): void {
        super.arrange();

        let buyButtonX: number = 0;
        if (this.managerIconsList.dataProvider.length > 0) {
            this.managerIconsListLayout.arrange(this.managerIconsList);
            buyButtonX = this.managerIconsList.x + this.managerIconsListLayout.getTotalSize().x + 15;
        }

        this.buyBtn.x = buyButtonX;
    }
}