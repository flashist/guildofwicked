import {Point} from "fsuite";

export interface IResizable {
    resizeSize: Point;
    resize(width: number, height: number);
}