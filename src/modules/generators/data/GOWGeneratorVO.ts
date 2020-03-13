import {BaseAppObjectWithStaticVO} from "../../../appframework/base/data/BaseAppObjectWithStaticVO";
import {GOWGeneratorVOStaticType} from "./GOWGeneratorVOStaticType";
import {IGOWStaticGeneratorVO} from "./IGOWStaticGeneratorVO";
import {GOWTimeTools} from "../../time/tools/GOWTimeTools";

export class GOWGeneratorVO extends BaseAppObjectWithStaticVO<IGOWStaticGeneratorVO> {

    public level: number = 0;
    public isProductionInProgress: boolean;
    public startProductionServerTime: number;

    constructor() {
        super();

        this.staticType = GOWGeneratorVOStaticType;
    }

    // For debugging
    update(source: Partial<this>): void {
        super.update(source);
    }

    public get isNextProductionAvailable(): boolean {
        return this.level > 0 && !this.isProductionInProgress;
    }

    public get startProductionClientTime(): number {
        return GOWTimeTools.convertServerToClientTime(this.startProductionServerTime);
    }

    public get finishProductionClientTime(): number {
        return this.startProductionClientTime + this.static.productionDuration;
    }

    public get productionTimeLeft(): number {
        let result: number = this.finishProductionClientTime - Date.now();
        if (result < 0) {
            result = 0;
        }
        return result;
    }

    public get productionCompleteCoef(): number {
        let result: number = 0;
        if (this.isProductionInProgress) {
            if (this.productionTimeLeft > 0) {
                result = 1 - (this.productionTimeLeft / this.static.productionDuration);
            } else {
                result = 1;
            }
        }

        if (result < 0) {
            result = 0;
        } else if (result > 1) {
            result = 1;
        }

        return result;
    }
}