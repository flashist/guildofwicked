import {BaseAppObjectWithStaticVO} from "../../../appframework/base/data/BaseAppObjectWithStaticVO";
import {GOWGeneratorVOStaticType} from "./GOWGeneratorVOStaticType";
import {IGOWStaticGeneratorVO} from "./IGOWStaticGeneratorVO";

export class GOWGeneratorVO extends BaseAppObjectWithStaticVO<IGOWStaticGeneratorVO> {

    constructor() {
        super();

        this.staticType = GOWGeneratorVOStaticType;
    }

}