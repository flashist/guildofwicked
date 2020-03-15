import {getInstance} from "fsuite";

import {BaseServerCommand} from "../../../appframework/server/commands/BaseServerCommand";
import {GOWServerModel} from "../models/GOWServerModel";
import {GOWUsersModel} from "../../users/models/GOWUsersModel";
import {GOWServerRequestId} from "../data/GOWServerRequestId";
import {IGeneralBuyRequestVO} from "../data/IGeneralBuyRequestVO";
import {IServerResponseVO} from "../../../appframework/server/data/IServerResponseVO";
import {GOWBaseServerCommand} from "./GOWBaseServerCommand";

export class GOWGeneralBuyServerRequestCommand extends GOWBaseServerCommand<IServerResponseVO, IGeneralBuyRequestVO> {

    protected serverModel: GOWServerModel;
    protected usersModel: GOWUsersModel = getInstance(GOWUsersModel);

    constructor(objectType: string, objectId: string) {
        super(
            {
                requestId: GOWServerRequestId.GENERAL_BUY,
                objectType: objectType,
                objectId: objectId
            } as IGeneralBuyRequestVO
        );
    }

}