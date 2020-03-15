import {BaseAppCommand} from "../../../appframework/base/commands/BaseAppCommand";

export class GOWBuyUpgradeForGeneratorCommand extends BaseAppCommand {

    constructor(protected upgradeId: string) {
        super();
    }

    protected executeInternal(): void {
    }

}