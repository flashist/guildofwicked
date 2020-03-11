import {BaseAppObjectWithStaticVO} from "../../../appframework/base/data/BaseAppObjectWithStaticVO";
import {GOWGeneratorVOStaticType} from "./GOWGeneratorVOStaticType";
import {IGOWStaticGeneratorVO} from "./IGOWStaticGeneratorVO";

export class GOWGeneratorVO extends BaseAppObjectWithStaticVO<IGOWStaticGeneratorVO> {

    public level: number = 0;
    public isProductionInProgress: boolean;

    constructor() {
        super();

        this.staticType = GOWGeneratorVOStaticType;
    }

    public get nextProductionAvailable(): boolean {
        return this.level > 0 && !this.isProductionInProgress;
    }
}