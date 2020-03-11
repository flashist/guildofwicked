import {BaseAppObjectWithStaticVO} from "../../../appframework/base/data/BaseAppObjectWithStaticVO";
import {GOWGeneratorVOStaticType} from "./GOWGeneratorVOStaticType";
import {IGOWStaticGeneratorVO} from "./IGOWStaticGeneratorVO";

export class GOWGeneratorVO extends BaseAppObjectWithStaticVO<IGOWStaticGeneratorVO> {

    public level: number = 0;

    constructor() {
        super();

        this.staticType = GOWGeneratorVOStaticType;
    }

}