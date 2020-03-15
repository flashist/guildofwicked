import {Align, GenericObjectsByTypeModel, getInstance, getText, VAlign} from "fsuite";

import {BaseView} from "../../../../../../appframework/base/views/BaseView";
import {SimpleButtonView} from "../../../../../../appframework/display/views/button/SimpleButtonView";
import {GOWGeneratorVO} from "../../../../../generators/data/GOWGeneratorVO";
import {IGOWUpgradeStaticVO} from "../../../../../upgrades/data/IGOWUpgradeStaticVO";
import {GOWUpgradeTools} from "../../../../../upgrades/tools/GOWUpgradeTools";
import {GOWUpgradeType} from "../../../../../upgrades/data/GOWUpgradeType";
import {SimpleList} from "../../../../../../appframework/display/views/simplelist/SimpleList";
import {BaseLayout} from "../../../../../../appframework/display/views/layout/BaseLayout";
import {GOWGeneratorProductionManagerIconItemRendererView} from "./GOWGeneratorProductionManagerIconItemRendererView";
import {RowLayout} from "../../../../../../appframework/display/views/layout/RowLayout";
import {IGOWBonusStaticVO} from "../../../../../upgrades/data/IGOWBonusStaticVO";
import {GOWBonusStaticVOType} from "../../../../../upgrades/data/GOWBonusStaticVOType";
import {GOWTextTools} from "../../../../../texts/tools/GOWTextTools";
import {GOWSettings} from "../../../../../../GOWSettings";

export class GOWGeneratorProductionManagersItemRendererView extends BaseView<GOWGeneratorVO> {

    protected genericByTypeModel: GenericObjectsByTypeModel;

    protected managerIconsList: SimpleList;
    protected managerIconsListLayout: BaseLayout;

    protected buyBtn: SimpleButtonView;

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
                        bgAlpha: 1,
                        bgBorderColor: GOWSettings.colors.black,
                        bgBorderAlpha: 1,
                        bgBorderWidth: 2
                    },
                    resizeBg: true
                },
                labelConfig: {
                    fontFamily: "Clarence",
                    size: 18,
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
                bought: true
            }
        );
        if (notBoughtUpgrades && notBoughtUpgrades.length > 0) {
            const firstAvailableUpgradeData: IGOWUpgradeStaticVO = notBoughtUpgrades[0];
            const firstAvailableBonus: IGOWBonusStaticVO = this.genericByTypeModel.getItem(
                GOWBonusStaticVOType,
                firstAvailableUpgradeData.bonusId
            );

            this.buyBtn.visible = true;
            this.buyBtn.text = getText(
                "hireManager",
                {
                    upgrade: getText(
                        firstAvailableBonus.localeId
                    ),
                    price: GOWTextTools.getFormattedResourceAmount(firstAvailableUpgradeData.price)
                }
            );

        } else {
            this.buyBtn.visible = false;
        }
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