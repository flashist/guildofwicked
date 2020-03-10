import {BaseModel} from "../../../appframework/base/models/BaseModel";
import {GOWGeneratorVO} from "../data/GOWGeneratorVO";

export class GOWGeneratorsModel extends BaseModel<GOWGeneratorVO> {

    protected construction(...args): void {
        super.construction(...args);

        this.DefaultItemClass = GOWGeneratorVO;
    }

}