import {getInstance} from "fsuite";

import {BaseServerCommand} from "../../../appframework/server/commands/BaseServerCommand";
import {IServerResponseVO} from "../../../appframework/server/data/IServerResponseVO";
import {IServerRequestVO} from "../../../appframework/server/data/IServerRequestVO";
import {GOWServerEmulatorManager} from "../../serveremulator/managers/GOWServerEmulatorManager";

export class GOWBaseServerCommand
    <
        ResponseType extends IServerResponseVO = IServerResponseVO,
        RequestType extends IServerRequestVO = IServerRequestVO,
    >
    extends BaseServerCommand<ResponseType, RequestType> {

    protected serverEmulator: GOWServerEmulatorManager = getInstance(GOWServerEmulatorManager);

    protected executeInternal(): void {
        this.serverEmulator.sendRequest(this.requestData)
            .then(
                (response: ResponseType) => {
                    this.notifyComplete(response);
                }
            );
    }

}