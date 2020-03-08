import {FContainer} from "fsuite";
import {IWindowConfigVO} from "./data/IWindowConfigVO";

export class BaseWindow extends FContainer {

    private _config: IWindowConfigVO;

    get config(): IWindowConfigVO {
        return this._config;
    }
    set config(value: IWindowConfigVO) {
        if (value === this.config) {
            return;
        }

        this._config = value;

        this.commitData();
    }


}