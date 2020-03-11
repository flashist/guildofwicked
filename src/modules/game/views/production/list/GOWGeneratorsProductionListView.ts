import {DragHelper, DragHelperEvent, GenericObjectsByTypeModel, getInstance, Graphics, Point} from "fsuite";

import {BaseView} from "../../../../../appframework/base/views/BaseView";
import {SimpleList} from "../../../../../appframework/display/views/simplelist/SimpleList";
import {GOWGeneratorProductionItemRendererView} from "./GOWGeneratorProductionItemRendererView";
import {GOWGeneratorVO} from "../../../../generators/data/GOWGeneratorVO";
import {ColumnLayout} from "../../../../../appframework/display/views/layout/ColumnLayout";
import {IGOWStaticGeneratorVO} from "../../../../generators/data/IGOWStaticGeneratorVO";
import {GOWGeneratorVOStaticType} from "../../../../generators/data/GOWGeneratorVOStaticType";
import {GOWGamePageModel} from "../../../models/GOWGamePageModel";
import {GOWGeneratorsModel} from "../../../../generators/models/GOWGeneratorsModel";

export class GOWGeneratorsProductionListView extends BaseView {

    protected gamePageModel: GOWGamePageModel;
    protected generatorsModel: GOWGeneratorsModel;
    protected genericByTypeModel: GenericObjectsByTypeModel;

    protected generatorsList: SimpleList<GOWGeneratorProductionItemRendererView, GOWGeneratorVO>;
    protected generatorsListLayout: ColumnLayout;
    protected generatorsListMask: Graphics;
    protected dragHelper: DragHelper;

    protected startDragViewLocalPos: Point;
    protected startDragViewGlobalPos: Point;
    protected dragMinY: number;

    protected construction(...args): void {
        super.construction(...args);

        this.startDragViewLocalPos = new Point();

        this.gamePageModel = getInstance(GOWGamePageModel);
        this.generatorsModel = getInstance(GOWGeneratorsModel);
        this.genericByTypeModel = getInstance(GenericObjectsByTypeModel);

        this.generatorsList = new SimpleList<GOWGeneratorProductionItemRendererView, GOWGeneratorVO>();
        this.addChild(this.generatorsList);
        this.generatorsList.interactive = true;
        //
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

        this.generatorsListLayout = new ColumnLayout();

        this.generatorsListMask = new Graphics();
        this.addChild(this.generatorsListMask);
        this.generatorsListMask.beginFill(0x000000);
        this.generatorsListMask.drawRect(0, 0, 100, 100);
        this.generatorsListMask.endFill();
        //
        this.generatorsList.mask = this.generatorsListMask;

        this.dragHelper = new DragHelper();
        this.dragHelper.view = this.generatorsList;
    }

    protected addListeners(): void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            this.dragHelper,
            DragHelperEvent.DRAG_START,
            this.onDragStart
        );
        this.eventListenerHelper.addEventListener(
            this.dragHelper,
            DragHelperEvent.DRAG_UPDATE,
            this.onDragUpdate
        );
    }

    protected onDragStart(): void {
        this.startDragViewLocalPos.x = this.generatorsList.x;
        this.startDragViewLocalPos.y = this.generatorsList.y;
        this.startDragViewGlobalPos = this.generatorsList.parent.toGlobal(this.startDragViewLocalPos) as any;

        this.commitDragData();
    }

    protected onDragUpdate(): void {
        this.commitDragData();
    }

    protected arrange(): void {
        super.arrange();

        this.generatorsList.resizeItems(
            this.resizeSize.x,
            140
        );
        this.generatorsListLayout.arrange(this.generatorsList);

        this.generatorsListMask.width = this.resizeSize.x;
        this.generatorsListMask.height = this.resizeSize.y;

        // this.dragMinY = (this.generatorsListMask.y + this.generatorsListMask.height - this.generatorsList.height);
        const totalSize: Point = this.generatorsListLayout.getTotalSize();
        this.dragMinY = (this.generatorsListMask.y + this.generatorsListMask.height - totalSize.y);

        this.commitDragData();
    }

    protected commitDragData(): void {
        if (!this.dragHelper.isDragStarted) {
            return;
        }

        const viewEndDragGlobalPos: Point = new Point(
            this.startDragViewGlobalPos.x + this.dragHelper.changeDragGlobalX,
            this.startDragViewGlobalPos.y + this.dragHelper.changeDragGlobalY
        );
        const viewEndDragLocalPos: Point = this.generatorsList.parent.toLocal(viewEndDragGlobalPos) as any;

        if (viewEndDragLocalPos.y > this.generatorsListMask.y) {
            viewEndDragLocalPos.y = this.generatorsListMask.y
        } else if (viewEndDragLocalPos.y < this.dragMinY) {
            viewEndDragLocalPos.y = this.dragMinY;
        }

        this.generatorsList.y = Math.floor(viewEndDragLocalPos.y);
    }
}