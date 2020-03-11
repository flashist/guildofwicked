import {GOWBaseServerCommand} from "./GOWBaseServerCommand";
import {IInitServerRequestVO} from "../data/IInitServerRequestVO";
import {IInitServerResponseVO} from "../data/IInitServerResponseVO";
import {GOWServerRequestId} from "../data/GOWServerRequestId";

export class GOWInitServerRequestCommand extends GOWBaseServerCommand<IInitServerResponseVO, IInitServerRequestVO> {
    constructor(loginData: string) {
        super(
            {
                id: GOWServerRequestId.INIT,
                loginData: loginData
            } as IInitServerRequestVO
        );
    }
}