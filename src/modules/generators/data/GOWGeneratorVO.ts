import {BaseAppObjectWithStaticVO} from "../../../appframework/base/data/BaseAppObjectWithStaticVO";
import {GOWGeneratorVOStaticType} from "./GOWGeneratorVOStaticType";
import {IGOWStaticGeneratorVO} from "./IGOWStaticGeneratorVO";

export class GOWGeneratorVO extends BaseAppObjectWithStaticVO<IGOWStaticGeneratorVO> {

    public level: number = 0;
    public isProductionInProgress: boolean;
    public startProductionTime: number;

    constructor() {
        super();

        this.staticType = GOWGeneratorVOStaticType;
    }

    public get isNextProductionAvailable(): boolean {
        return this.level > 0 && !this.isProductionInProgress;
    }
}