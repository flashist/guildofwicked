import {GOWServerModel} from "../models/GOWServerModel";
import {GOWServerRequestId} from "../data/GOWServerRequestId";
import {IGeneralBuyRequestVO} from "../data/IGeneralBuyRequestVO";
import {IServerResponseVO} from "../../../appframework/server/data/IServerResponseVO";
import {GOWBaseServerCommand} from "./GOWBaseServerCommand";

export class GOWGeneralBuyServerRequestCommand extends GOWBaseServerCommand<IServerResponseVO, IGeneralBuyRequestVO> {

    protected serverModel: GOWServerModel;

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