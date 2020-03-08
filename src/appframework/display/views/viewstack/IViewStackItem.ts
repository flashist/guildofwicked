import {IResizable} from "../resize/IResizable";

export interface IViewStackItem extends Partial<IResizable> {
    data?: any;
}