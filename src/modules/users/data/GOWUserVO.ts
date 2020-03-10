import {BaseDataVO} from "fsuite";
import {GOWResourceType} from "../../resources/data/GOWResourceType";

export class GOWUserVO extends BaseDataVO {

    resources: {[key: string]: number} = {};

    public getResource(resourceType: GOWResourceType): number {
        let result: number = this.resources[resourceType];
        if (!result) {
            result = 0;
        }
        return result;
    }
}