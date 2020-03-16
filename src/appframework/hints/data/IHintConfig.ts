import {Point} from "fsuite";

export interface IHintConfig {
    containerId: string;

    startGlobalPos: Point;

    positionTweenDuration: number;
    finalGlobalPosMinChange: Point;
    finalGlobalPosMaxChange: Point;

    startAlphaTweenDuration: number;
    startAlphaTweenDelay: number;
    finalAlphaTweenDuration: number;
    finalAlphaTweenDelay: number;

    startAlpha: number;
    mainAlpha: number;
    finalAlpha: number;
}