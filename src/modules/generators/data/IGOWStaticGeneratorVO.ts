import {BaseDataVO} from "fsuite";
import {GOWResourceType} from "../../resources/data/GOWResourceType";

export interface IGOWStaticGeneratorVO extends BaseDataVO {

    localeId: string;
    icon: string;
    resource: GOWResourceType;

    index: number;
    basePrice: number;
    buyCoef: number;
    productionValue: number;
    productionTime: number;

}