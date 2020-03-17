import {DefaultAppConfigVO} from "../../../appframework/app/data/DefaultAppConfigVO";
import {GOWSettings} from "../../../GOWSettings";

export class GOWDefaultAppConfigVO extends DefaultAppConfigVO {

    constructor() {
        super();

        this.appSettings.backgroundColor = GOWSettings.colors.white;
    }
}