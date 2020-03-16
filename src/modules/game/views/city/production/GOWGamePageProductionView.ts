import {Align, GenericObjectsByTypeModel, getInstance, getText, Graphics, InteractiveEvent, VAlign} from "fsuite";

import {BaseView} from "../../../../../appframework/base/views/BaseView";
import {GOWGamePageModel} from "../../../models/GOWGamePageModel";
import {GOWGamePageModelEvent} from "../../../events/GOWGamePageModelEvent";
import {SimpleButtonView} from "../../../../../appframework/display/views/button/SimpleButtonView";
import {GOWSettings} from "../../../../../GOWSettings";
import {ToggleGroup} from "../../../../../appframework/display/views/togglegroup/ToggleGroup";
import {GOWGamePageProductionTabId} from "../../../data/GOWGamePageProductionTabId";
import {GOWQuickActionView} from "./GOWQuickActionView";
import {GOWGeneratorsModel} from "../../../../generators/models/GOWGeneratorsModel";
import {GOWGeneratorsProductionListView} from "./list/GOWGeneratorsProductionListView";

export class GOWGamePageProductionView extends BaseView {

    protected gamePageModel: GOWGamePageModel;
    protected generatorsModel: GOWGeneratorsModel;
    protected genericByTypeModel: GenericObjectsByTypeModel;

    protected bg: Graphics;
    protected moneyTabButton: SimpleButtonView;
    protected unitsTabButton: SimpleButtonView;
    public tabsToggleGroup: ToggleGroup;
    protected quickActionView: GOWQuickActionView;

    protected generatorsView: GOWGeneratorsProductionListView;

    protected construction(...args): void {
        super.construction(...args);

        this.gamePageModel = getInstance(GOWGamePageModel);
        this.generatorsModel = getInstance(GOWGeneratorsModel);
        this.genericByTypeModel = getInstance(GenericObjectsByTypeModel);

        this.bg = new Graphics();
        this.addChild(this.bg);
        //
        this.bg.beginFill(GOWSettings.colors.grey);
        this.bg.drawRect(0,0,100,100);
        this.bg.endFill();

        this.generatorsView = getInstance(GOWGeneratorsProductionListView);
        this.addChild(this.generatorsView);

        this.moneyTabButton = new SimpleButtonView(
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
                    size: 48,
                    color: GOWSettings.colors.black,
                    autosize: true,
                    align: Align.CENTER,
                    valign: VAlign.MIDDLE,

                    stroke: GOWSettings.colors.white,
                    strokeThickness: 1.5,

                    dropShadow: true,
                    dropShadowColor: GOWSettings.colors.white,
                    dropShadowDistance: 0,
                    dropShadowBlur: 4
                }
            }
        );
        this.addChild(this.moneyTabButton);
        //
        this.moneyTabButton.id = GOWGamePageProductionTabId.MONEY;
        this.moneyTabButton.text = getText("money");

        this.unitsTabButton = new SimpleButtonView(
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
                    size: 48,
                    color: GOWSettings.colors.black,
                    autosize: true,
                    align: Align.CENTER,
                    valign: VAlign.MIDDLE,

                    stroke: GOWSettings.colors.white,
                    strokeThickness: 1.5,

                    dropShadow: true,
                    dropShadowColor: GOWSettings.colors.white,
                    dropShadowDistance: 0,
                    dropShadowBlur: 4
                }
            }
        );
        this.addChild(this.unitsTabButton);
        //
        this.unitsTabButton.id = GOWGamePageProductionTabId.UNITS;
        this.unitsTabButton.text = getText("units");
        //
        this.tabsToggleGroup = new ToggleGroup();
        this.tabsToggleGroup.addItem(this.moneyTabButton);
        this.tabsToggleGroup.addItem(this.unitsTabButton);

        this.quickActionView = getInstance(GOWQuickActionView);
        this.addChild(this.quickActionView);
    }

    protected addListeners(): void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            this.gamePageModel,
            GOWGamePageModelEvent.PRODUCTION_TAB_ID_CHANGE,
            this.onTabIdChange
        );

        this.eventListenerHelper.addEventListener(
            this.moneyTabButton,
            InteractiveEvent.TAP,
            this.onMoneyTab
        );
        this.eventListenerHelper.addEventListener(
            this.unitsTabButton,
            InteractiveEvent.TAP,
            this.onUnitsTab
        );
    }

    protected onMoneyTab(): void {
        this.tabsToggleGroup.selectedId = GOWGamePageProductionTabId.MONEY;
    }

    protected onUnitsTab(): void {
        this.tabsToggleGroup.selectedId = GOWGamePageProductionTabId.UNITS;
    }

    protected onTabIdChange(): void {
        this.commitData();
    }

    protected commitData(): void {
        super.commitData();

        this.tabsToggleGroup.selectedId = this.gamePageModel.productionTabId;

        this.arrange();
    }

    protected arrange(): void {
        super.arrange();

        this.bg.width = Math.floor(this.resizeSize.x);
        this.bg.height = Math.floor(this.resizeSize.y);

        this.moneyTabButton.resize(
            Math.ceil(this.resizeSize.x / 2),
            70
        );

        this.unitsTabButton.resize(
            Math.ceil(this.resizeSize.x / 2),
            70
        );
        this.unitsTabButton.x = this.moneyTabButton.x + this.moneyTabButton.width;

        this.quickActionView.resize(
            Math.ceil(this.resizeSize.x),
            70
        );
        this.quickActionView.y = Math.ceil(this.resizeSize.y - this.quickActionView.height);

        this.generatorsView.x = this.moneyTabButton.x;
        this.generatorsView.y = this.moneyTabButton.y + this.moneyTabButton.height;
        this.generatorsView.resize(
            this.resizeSize.x,
            this.quickActionView.y - (this.moneyTabButton.y + this.moneyTabButton.height)
        );
    }
}