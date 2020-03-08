import {IConstructor} from "fcore";

import {BaseWindow} from "../BaseWindow";

export interface IWindowConfigVO {
    type: string;
    RenderClass: IConstructor<BaseWindow>;
    bgConfig: {color: number, alpha: number};
}