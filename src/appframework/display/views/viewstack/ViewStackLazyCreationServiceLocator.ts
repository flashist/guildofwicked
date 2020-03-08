import {
    IConstructor,
    AssociativeArray
} from "fcore";

import {
    DisplayObject,
    getInstance
} from "fsuite";

import {ViewStackLazyCreation} from "./ViewStackLazyCreation";

export class ViewStackLazyCreationServiceLocator<StackViewType extends DisplayObject = DisplayObject> extends ViewStackLazyCreation<StackViewType> {

    protected getNewInstance(id: string): StackViewType {
        let result: StackViewType;

        let TempClass: IConstructor<any> = (this.viewClassToIdMap.getItem(id) as IConstructor<any>);
        if (TempClass) {
            result = getInstance(TempClass);
        }

        return result;
    }
}