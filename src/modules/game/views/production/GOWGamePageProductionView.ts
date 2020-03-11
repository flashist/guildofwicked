import {Align, GenericObjectsByTypeModel, getInstance, getText, Graphics, VAlign} from "fsuite";

import {BaseView} from "../../../../appframework/base/views/BaseView";
import {GOWGamePageModel} from "../../models/GOWGamePageModel";
import {GOWGamePageModelEvent} from "../../events/GOWGamePageModelEvent";
import {SimpleButtonView} from "../../../../appframework/display/views/button/SimpleButtonView";
import {GOWSettings} from "../../../../GOWSettings";
import {ToggleGroup} from "../../../../appframework/display/views/togglegroup/ToggleGroup";
import {GOWGamePageTabId} from "../../data/GOWGamePageTabId";
import {GOWQuickActionView} from "./GOWQuickActionView";
import {GOWGeneratorProductionItemRendererView} from "./list/GOWGeneratorProductionItemRendererView";
import {GOWGeneratorVO} from "../../../generators/data/GOWGeneratorVO";
import {SimpleList} from "../../../../appframework/display/views/simplelist/SimpleList";
import {IGOWStaticGeneratorVO} from "../../../generators/data/IGOWStaticGeneratorVO";
import {GOWGeneratorVOStaticType} from "../../../generators/data/GOWGeneratorVOStaticType";
import {ColumnLayout} from "../../../../appframework/display/views/layout/ColumnLayout";
import {GOWGeneratorsModel} from "../../../generators/models/GOWGeneratorsModel";

export class GOWGamePageProductionView extends BaseView {

    protected gamePageModel: GOWGamePageModel;
    protected generatorsModel: GOWGeneratorsModel;
    protected genericByTypeModel: GenericObjectsByTypeModel;

    protected bg: Graphics;
    protected moneyTabButton: SimpleButtonView;
    protected unitsTabButton: SimpleButtonView;
    public tabsToggleGroup: ToggleGroup;
    protected quickActionView: GOWQuickActionView;

    protected generatorsList: SimpleList<GOWGeneratorProductionItemRendererView, GOWGeneratorVO>;
    protected generatorsListLayout: ColumnLayout;
    protected generatorsListMask: Graphics;

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

        this.generatorsList = new SimpleList<GOWGeneratorProductionItemRendererView, GOWGeneratorVO>();
        this.addChild(this.generatorsList);
        this.generatorsList.ItemRendererClass = GOWGeneratorProductionItemRendererView;
        //
        const staticGeneratorsList: IGOWStaticGeneratorVO[] = this.genericByTypeModel.getItemsForType<IGOWStaticGeneratorVO>(GOWGeneratorVOStaticType);
        const generatorsList: GOWGeneratorVO[] = [];
        let generatorsCount: number = staticGeneratorsList.length;
        for (let generatorIndex: number = 0; generatorIndex < generatorsCount; generatorIndex++) {
            const singleStaticGenerator: IGOWStaticGeneratorVO = staticGeneratorsList[generatorIndex];
            const singleGenerator: GOWGeneratorVO = this.generatorsModel.getItem(singleStaticGenerator.id);
            generatorsList.push(singleGenerator);
        }
        //
        this.generatorsList.dataProvider = generatorsList;
        //
        this.generatorsListLayout = new ColumnLayout();
        //
        this.generatorsListMask = new Graphics();
        this.addChild(this.generatorsListMask);
        this.generatorsListMask.beginFill(0x000000);
        this.generatorsListMask.drawRect(0,0,100,100);
        this.generatorsListMask.endFill();
        //
        this.generatorsList.mask = this.generatorsListMask;

        this.moneyTabButton = new SimpleButtonView(
            {
                bgConfig: {
                    bgColor: GOWSettings.colors.yellow,
                    bgAlpha: 1,
                    bgBorderColor: GOWSettings.colors.black,
                    bgBorderAlpha: 1,
                    bgBorderWidth: 2
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
        this.moneyTabButton.id = GOWGamePageTabId.MONEY;
        this.moneyTabButton.text = getText("money");

        this.unitsTabButton = new SimpleButtonView(
            {
                bgConfig: {
                    bgColor: GOWSettings.colors.yellow,
                    bgAlpha: 1,
                    bgBorderColor: GOWSettings.colors.black,
                    bgBorderAlpha: 1,
                    bgBorderWidth: 2
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
        this.unitsTabButton.id = GOWGamePageTabId.UNITS;
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
            GOWGamePageModelEvent.TAB_ID_CHANGE,
            this.onTabIdChange
        );
    }

    protected onTabIdChange(): void {
        this.commitData();
    }

    protected commitData(): void {
        super.commitData();

        this.tabsToggleGroup.selectedId = this.gamePageModel.tabId;

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

        this.generatorsList.y = this.moneyTabButton.y + this.moneyTabButton.height;
        this.generatorsList.x = this.moneyTabButton.x;
        //
        this.generatorsList.resizeItems(
            this.resizeSize.x,
            140
        );
        this.generatorsListLayout.arrange(this.generatorsList);

        this.generatorsListMask.x = this.generatorsList.x;
        this.generatorsListMask.y = this.generatorsList.y;
        this.generatorsListMask.width = this.resizeSize.x;
        this.generatorsListMask.height = this.quickActionView.y - (this.moneyTabButton.y + this.moneyTabButton.height);
    }
}