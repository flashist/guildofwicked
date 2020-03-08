import {getInstance} from "fsuite";

import {BaseManager} from "../../base/managers/BaseManager";
import {TimeModel} from "../models/TimeModel";

export class TimeManager extends BaseManager {

    protected timeModel: TimeModel = getInstance(TimeModel);

    protected addListeners(): void {
        super.addListeners();

        //this is the same PIXI's ticker as it uses for its purposes (like MovieClips atc)
        PIXI.ticker.shared.add(this.onTick, this);
    }

    protected removeListeners(): void {
        super.removeListeners();

        PIXI.ticker.shared.remove(this.onTick, this);
    }

    protected onTick(deltaTime: number): void {
        this.timeModel.changeTimeData(Date.now(), deltaTime);
    }
}