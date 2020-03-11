import {BaseModel} from "../../../appframework/base/models/BaseModel";
import {GOWGeneratorVO} from "../data/GOWGeneratorVO";
import {GOWGeneratorVOType} from "../data/GOWGeneratorVOType";

export class GOWGeneratorsModel extends BaseModel<GOWGeneratorVO> {

    protected construction(...args): void {
        super.construction(...args);

        this.itemsType = GOWGeneratorVOType;
        this.DefaultItemClass = GOWGeneratorVO;
    }

}