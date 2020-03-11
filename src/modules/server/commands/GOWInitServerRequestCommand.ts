import {GOWBaseServerCommand} from "./GOWBaseServerCommand";
import {IInitServerRequestVO} from "../data/IInitServerRequestVO";
import {IInitServerResponseVO} from "../data/IInitServerResponseVO";
import {GOWServerRequestId} from "../data/GOWServerRequestId";
import {GOWUsersModel} from "../../users/models/GOWUsersModel";
import {getInstance} from "fsuite";

export class GOWInitServerRequestCommand extends GOWBaseServerCommand<IInitServerResponseVO, IInitServerRequestVO> {

    protected usersModel: GOWUsersModel = getInstance(GOWUsersModel);

    constructor(loginData: string) {
        super(
            {
                id: GOWServerRequestId.INIT,
                loginData: loginData
            } as IInitServerRequestVO
        );
    }

    protected notifyComplete(resolveData?: IInitServerResponseVO, rejectErrorData?: any): void {
        this.usersModel.curUserId = resolveData.userId;

        super.notifyComplete(resolveData, rejectErrorData);
    }
}