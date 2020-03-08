import {
    Command
} from "fcore";

import {
    getInstance,
    LoadManager
} from "fsuite";

import {AssetsModel} from "../models/AssetsModel";

export class ParseAssetsConfigCommand extends Command {

    protected executeInternal(): void {
        super.executeInternal();

        let loadManager: LoadManager = getInstance(LoadManager);

        // Go through all
        let assetsModel: AssetsModel = getInstance(AssetsModel);
        const assetsCount: number = assetsModel.assetsConfig.files.length;
        for (let assetIndex: number = 0; assetIndex < assetsCount; assetIndex++) {
            loadManager.add(assetsModel.assetsConfig.files[assetIndex]);
        }

        this.notifyComplete();
    }
}