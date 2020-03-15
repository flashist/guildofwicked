import {IGOWResourceVO} from "./IGOWResourceVO";

export interface ICheckEnoughResourcesVO {
    isEnough: boolean;

    notEnoughResources: {[resourceType: string]: IGOWResourceVO};
    notEnoughResourcesList: IGOWResourceVO[];
}