import {BaseAppObjectWithStaticVO} from "../../../appframework/base/data/BaseAppObjectWithStaticVO";
import {IGOWGeneratorStaticVO} from "./IGOWGeneratorStaticVO";
import {GOWTimeTools} from "../../time/tools/GOWTimeTools";
import {GOWGeneratorStaticVOType} from "./GOWGeneratorStaticVOType";
import {IGOWResourceVO} from "../../resources/data/IGOWResourceVO";
import {IGOWCumulativeBonusesData} from "../../upgrades/data/IGOWCumulativeBonusesData";
import {GOWBonusTools} from "../../upgrades/tools/GOWBonusTools";
import {GOWBonusType} from "../../upgrades/data/GOWBonusType";
import {GOWResourceType} from "../../resources/data/GOWResourceType";

export class GOWGeneratorVO extends BaseAppObjectWithStaticVO<IGOWGeneratorStaticVO> {

    public level: number = 0;
    public isProductionInProgress: boolean;
    public startProductionServerTime: number;

    public boughtUpgradeIds: string[] = [];

    protected cumulativeBonuses: IGOWCumulativeBonusesData;
    private _cumulativeProductionValue: IGOWResourceVO;
    private _cumulativeProductionDuration: number;

    constructor() {
        super();

        this.staticType = GOWGeneratorStaticVOType;
        this._cumulativeProductionValue = {
            type: GOWResourceType.MONEY,
            value: 0
        };
    }

    update(source: Partial<this>): void {
        super.update(source);

        this.cumulativeBonuses = GOWBonusTools.getCumulativeBonusesFromUgpradesData(this.boughtUpgradeIds);
        this._cumulativeProductionValue.type = this.static.productionValue.type;

        this._cumulativeProductionValue.value = this.findCumulativeProductionForLevel(this.level);

        let durationCoef: number = 1;
        if (this.cumulativeBonuses[GOWBonusType.DURATION]) {
            durationCoef = this.cumulativeBonuses[GOWBonusType.DURATION];
        }
        this._cumulativeProductionDuration = this.static.productionDuration / durationCoef;
    }

    public get isNextProductionAvailable(): boolean {
        return this.level > 0 && !this.isProductionInProgress;
    }

    public get startProductionClientTime(): number {
        return GOWTimeTools.convertServerToClientTime(this.startProductionServerTime);
    }

    public get finishProductionClientTime(): number {
        return this.startProductionClientTime + this.cumulativeProductionDuration;
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
                result = 1 - (this.productionTimeLeft / this.cumulativeProductionDuration);
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

    get cumulativeProductionValue(): IGOWResourceVO {
        return this._cumulativeProductionValue;
    }

    get cumulativeProductionDuration(): number {
        return this._cumulativeProductionDuration;
    }

    public findCumulativeProductionForLevel(targetLevel: number): number {
        let profitCoef: number = 1;
        if (this.cumulativeBonuses[GOWBonusType.PROFIT]) {
            profitCoef = this.cumulativeBonuses[GOWBonusType.PROFIT];
        }

        return this.static.productionValue.value * profitCoef * targetLevel;
    }

}