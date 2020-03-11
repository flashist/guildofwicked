import {BaseAppObjectWithStaticVO} from "../../../appframework/base/data/BaseAppObjectWithStaticVO";
import {GOWGeneratorVOStaticType} from "./GOWGeneratorVOStaticType";
import {IGOWStaticGeneratorVO} from "./IGOWStaticGeneratorVO";
import {GOWTimeTools} from "../../time/tools/GOWTimeTools";

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

    public get startProductionClientTime(): number {
        return GOWTimeTools.convertServerToClientTime(this.startProductionTime);
    }

    public get finishProductionClientTime(): number {
        return this.startProductionClientTime + this.static.productionDuration;
    }

    public get productionTimeLeft(): number {
        return this.finishProductionClientTime - this.startProductionClientTime;
    }

    public get productionCompleteCoef(): number {
        let result: number = 0;
        if (this.isProductionInProgress) {
            result = this.static.productionDuration / this.productionTimeLeft;
        }

        return result;
    }
}