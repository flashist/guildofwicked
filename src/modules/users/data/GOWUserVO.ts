import {BaseDataVO} from "fsuite";
import {GOWResourceType} from "../../resources/data/GOWResourceType";
import {IGOWResourceVO} from "../../resources/data/IGOWResourceVO";

export class GOWUserVO extends BaseDataVO {

    resources: {[resourceType: string]: IGOWResourceVO} = {};

    public getResource(resourceType: GOWResourceType): IGOWResourceVO {
        if (!this.resources[resourceType]) {
            this.resources[resourceType] = {
                type: resourceType,
                value: 0
            }
        }

        return this.resources[resourceType];
    }

}