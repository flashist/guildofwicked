import {BaseDataVO} from "fsuite";
import {GOWResourceType} from "../../resources/data/GOWResourceType";
import {IGOWResourceVO} from "../../resources/data/IGOWResourceVO";

export interface IGOWGeneratorStaticVO extends BaseDataVO {

    localeId: string;
    icon: string;
    resource: GOWResourceType;

    index: number;
    basePrice: IGOWResourceVO;
    isStartGenerator?: boolean;
    buyCoef: number;

    productionValue: IGOWResourceVO;
    productionDuration: number;

}