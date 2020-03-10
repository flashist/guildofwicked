import {
    DisplayObjectContainer
} from "fsuite";

export interface IToggableItem extends DisplayObjectContainer {
    id?: string;
    selected: boolean;
}