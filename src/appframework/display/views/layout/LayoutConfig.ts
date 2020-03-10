import {Point} from "fsuite";

/**
 * ...
 * @author Mark (ruFlashist@gmail.com)
 */
export class LayoutConfig {
    // Количество столбцов (x) и строк (y)
    // columnCount:number;
    // rowCount:number;

    // Отступ от краёв
    // padding:Point;
    paddingX: number = 0;
    paddingY: number = 0;
    // Отступ между элементами
    // spacing:Point;
    spacingX: number = 0;
    spacingY: number = 0;

    // Выравнивание
    align: string = "";
    valign: string = "";

    // Нужно ли округлять координаты
    isNeedFloorCoordinates: boolean = true;

    // Выравнивание для стороны с меньшим размером
    // lessSideAlign:string;
    // lessSideValign:string;

}