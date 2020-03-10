import {BaseAppObjectWithStaticVO} from "../../../appframework/base/data/BaseAppObjectWithStaticVO";
import {GOWStaticGeneratorVOType} from "./GOWStaticGeneratorVOType";
import {IGOWStaticGeneratorVO} from "./IGOWStaticGeneratorVO";

export class GOWGeneratorVO extends BaseAppObjectWithStaticVO<IGOWStaticGeneratorVO> {

    constructor() {
        super();

        this.staticType = GOWStaticGeneratorVOType;
    }

}