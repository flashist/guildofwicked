import {getInstance} from "fsuite";

import {BaseManager} from "../../../appframework/base/managers/BaseManager";
import {TimeModel} from "../../../appframework/time/models/TimeModel";
import {TimeModelEvent} from "../../../appframework/time/models/TimeModelEvent";

export class GOWProductionManagers extends BaseManager {

    protected timeModel: TimeModel;
    protected prevProductionTime: number = 0;

    protected construction(...args): void {
        super.construction(...args);

        this.timeModel = getInstance(TimeModel);
    }

    protected addListeners(): void {
        super.addListeners();

        this.globalDispatcher.addEventListener(
            TimeModelEvent.TIME_DATA_CHANGE,
            this.onTimeChange
        );
    }

    protected onTimeChange(): void {

    }

    protected processProductionTick(): void {

    }
}