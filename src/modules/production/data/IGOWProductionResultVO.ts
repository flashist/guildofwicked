import {IGOWResourceVO} from "../../resources/data/IGOWResourceVO";

export interface IGOWProductionResultVO {
    profitByGenerator: {
        [generatorId: string]: IGOWResourceVO
    },
    totalProfit: {
        [resourceType: string]: IGOWResourceVO
    }
}