import {GOWBaseServerCommand} from "../../server/commands/GOWBaseServerCommand";
import {IServerResponseVO} from "../../../appframework/server/data/IServerResponseVO";
import {GOWServerRequestId} from "../../server/data/GOWServerRequestId";
import {IServerRequestVO} from "../../../appframework/server/data/IServerRequestVO";

export class GOWCalculateProductionServerRequestCommand extends GOWBaseServerCommand<IServerResponseVO, IServerRequestVO> {

    constructor() {
        super(
            {
                requestId: GOWServerRequestId.CALCULATE_PRODUCTION
            }
        );
    }

}