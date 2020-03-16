import {GenericObjectsByTypeModel, getInstance} from "fsuite";

import {BaseView} from "../../../../../appframework/base/views/BaseView";
import {SimpleList} from "../../../../../appframework/display/views/simplelist/SimpleList";
import {GOWGeneratorsModel} from "../../../../generators/models/GOWGeneratorsModel";
import {GOWGeneratorVO} from "../../../../generators/data/GOWGeneratorVO";
import {IGOWGeneratorStaticVO} from "../../../../generators/data/IGOWGeneratorStaticVO";
import {GOWSettings} from "../../../../../GOWSettings";
import {GOWGeneratorsTools} from "../../../../generators/tools/GOWGeneratorsTools";
import {GOWResourceType} from "../../../../resources/data/GOWResourceType";
import {GOWVisualizationItemRendererView} from "./GOWVisualizationItemRendererView";

export class GOWGamePageMoneyVisuzalizationView extends BaseView {

    protected generatorsModel: GOWGeneratorsModel = getInstance(GOWGeneratorsModel);
    protected genericByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);

    protected itemsList: SimpleList<GOWVisualizationItemRendererView, GOWGeneratorVO>;

    protected construction(...args): void {
        super.construction(...args);

        this.generatorsModel = getInstance(GOWGeneratorsModel);
        this.genericByTypeModel = getInstance(GenericObjectsByTypeModel);

        this.itemsList = new SimpleList<GOWVisualizationItemRendererView, GOWGeneratorVO>();
        this.addChild(this.itemsList);
        this.itemsList.ItemRendererClass = GOWVisualizationItemRendererView;

        const staticGeneratorsList: IGOWGeneratorStaticVO[] = GOWGeneratorsTools.getStaticGenerators({resourceTypes: [GOWResourceType.MONEY]});
        const generatorsList: GOWGeneratorVO[] = [];
        let generatorsCount: number = staticGeneratorsList.length;
        for (let generatorIndex: number = 0; generatorIndex < generatorsCount; generatorIndex++) {
            const singleStaticGenerator: IGOWGeneratorStaticVO = staticGeneratorsList[generatorIndex];
            const singleGenerator: GOWGeneratorVO = this.generatorsModel.getItem(singleStaticGenerator.id);
            generatorsList.push(singleGenerator);
        }
        //
        this.itemsList.dataProvider = generatorsList;
    }

    protected arrange(): void {
        super.arrange();

        const itemViews: GOWVisualizationItemRendererView[] = this.itemsList.getItems();
        let itemsCount: number = itemViews.length;
        for (let itemIndex: number = 0; itemIndex < itemsCount; itemIndex++) {
            const singleItemView: GOWVisualizationItemRendererView = itemViews[itemIndex];
            const singleItemPositionCoef = GOWSettings.gamePage.layout.visualiztion.money.itemPositionsCoefs[itemIndex];
            singleItemView.x = Math.floor(this.resizeSize.x * singleItemPositionCoef.x);
            singleItemView.y = Math.floor(this.resizeSize.y * singleItemPositionCoef.y);
        }
    }
}