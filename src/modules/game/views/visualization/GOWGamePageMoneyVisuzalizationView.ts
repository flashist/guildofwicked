import {FContainer, GenericObjectsByTypeModel, getInstance, IGenericObjectWithStaticVO} from "fsuite";

import {BaseView} from "../../../../appframework/base/views/BaseView";
import {SimpleList} from "../../../../appframework/display/views/simplelist/SimpleList";
import {GOWVisuzalizationItemRenderer} from "./GOWVisuzalizationItemRenderer";
import {GOWGeneratorsModel} from "../../../generators/models/GOWGeneratorsModel";
import {GOWGeneratorVOStaticType} from "../../../generators/data/GOWGeneratorVOStaticType";
import {GOWGeneratorVO} from "../../../generators/data/GOWGeneratorVO";
import {IGOWStaticGeneratorVO} from "../../../generators/data/IGOWStaticGeneratorVO";
import {GOWSettings} from "../../../../GOWSettings";

export class GOWGamePageMoneyVisuzalizationView extends BaseView {

    protected generatorsModel: GOWGeneratorsModel = getInstance(GOWGeneratorsModel);
    protected genericByTypeModel: GenericObjectsByTypeModel = getInstance(GenericObjectsByTypeModel);

    protected itemsList: SimpleList<GOWVisuzalizationItemRenderer, GOWGeneratorVO>;

    protected construction(...args): void {
        super.construction(...args);

        this.generatorsModel = getInstance(GOWGeneratorsModel);
        this.genericByTypeModel = getInstance(GenericObjectsByTypeModel);

        this.itemsList = new SimpleList<GOWVisuzalizationItemRenderer, GOWGeneratorVO>();
        this.addChild(this.itemsList);
        this.itemsList.ItemRendererClass = GOWVisuzalizationItemRenderer;

        const staticGeneratorsList: IGOWStaticGeneratorVO[] = this.genericByTypeModel.getItemsForType<IGOWStaticGeneratorVO>(GOWGeneratorVOStaticType);
        const generatorsList: GOWGeneratorVO[] = [];
        let generatorsCount: number = staticGeneratorsList.length;
        for (let generatorIndex: number = 0; generatorIndex < generatorsCount; generatorIndex++) {
            const singleStaticGenerator: IGOWStaticGeneratorVO = staticGeneratorsList[generatorIndex];
            const singleGenerator: GOWGeneratorVO = this.generatorsModel.getItem(singleStaticGenerator.id);
            generatorsList.push(singleGenerator);
        }
        //
        this.itemsList.dataProvider = generatorsList;
    }

    protected arrange(): void {
        super.arrange();

        const itemViews: GOWVisuzalizationItemRenderer[] = this.itemsList.getItems();
        let itemsCount: number = itemViews.length;
        for (let itemIndex: number = 0; itemIndex < itemsCount; itemIndex++) {
            const singleItemView: GOWVisuzalizationItemRenderer = itemViews[itemIndex];
            const singleItemPositionCoef = GOWSettings.gamePage.visuzalization.layout.money.itemPositionsCoefs[itemIndex];
            singleItemView.x = Math.floor(this.resizeSize.x * singleItemPositionCoef.x);
            singleItemView.y = Math.floor(this.resizeSize.y * singleItemPositionCoef.y);
        }
    }
}