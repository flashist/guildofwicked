import {
    IConstructor
} from "fcore";

import {
    DisplayObjectContainer,
    getInstance
} from "fsuite";

import {ViewLazyCreationStack} from "./ViewLazyCreationStack";

export class ViewLazyCreationServiceLocatorStack<StackViewType extends DisplayObjectContainer = DisplayObjectContainer> extends ViewLazyCreationStack<StackViewType> {

    protected getNewInstance(id: string): StackViewType {
        let result: StackViewType;

        let TempClass: IConstructor<any> = (this.viewClassToIdMap.getItem(id) as IConstructor<any>);
        if (TempClass) {
            result = getInstance(TempClass);
        }

        return result;
    }
}