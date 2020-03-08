import {IConstructor} from "fcore";
import {Facade} from "./Facade";

export interface IFacadeOptions {
    FacadeClass?: IConstructor<Facade>;
    debug?: boolean;
}