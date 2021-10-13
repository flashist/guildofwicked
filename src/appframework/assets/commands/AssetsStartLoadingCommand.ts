import {
    getInstance,
    LoadManager
} from "@flashist/flibs";

import {AssetsModel} from "../models/AssetsModel";
import {BaseAppCommand} from "../../base/commands/BaseAppCommand";

export class AssetsStartLoadingCommand extends BaseAppCommand {

    protected executeInternal(): void {
        let loadManager: LoadManager = getInstance(LoadManager);
        let assetsModel: AssetsModel = getInstance(AssetsModel);
        const assetsCount: number = assetsModel.assetsConfig.files.length;
        for (let assetIndex: number = 0; assetIndex < assetsCount; assetIndex++) {
            loadManager.load(assetsModel.assetsConfig.files[assetIndex]);
        }

        this.notifyComplete();
    }
}