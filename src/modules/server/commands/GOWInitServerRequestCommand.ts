import {GOWBaseServerCommand} from "./GOWBaseServerCommand";
import {IInitServerRequestVO} from "../data/IInitServerRequestVO";
import {IInitServerResponseVO} from "../data/IInitServerResponseVO";
import {GOWServerRequestId} from "../data/GOWServerRequestId";
import {GOWUsersModel} from "../../users/models/GOWUsersModel";
import {getInstance} from "fsuite";
import {GOWServerModel} from "../models/GOWServerModel";

export class GOWInitServerRequestCommand extends GOWBaseServerCommand<IInitServerResponseVO, IInitServerRequestVO> {

    protected serverModel: GOWServerModel;
    protected usersModel: GOWUsersModel = getInstance(GOWUsersModel);

    constructor(loginData: string) {
        super(
            {
                requestId: GOWServerRequestId.INIT,
                loginData: loginData
            } as IInitServerRequestVO
        );
    }

    protected notifyComplete(resolveData?: IInitServerResponseVO, rejectErrorData?: any): void {
        this.serverModel.initResponse = resolveData;
        this.usersModel.curUserId = resolveData.userId;

        super.notifyComplete(resolveData, rejectErrorData);
    }
}