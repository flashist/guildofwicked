import {IServerResponseVO} from "../../../appframework/server/data/IServerResponseVO";
import {IGeneratorStartRequestVO} from "../../server/data/IGeneratorStartRequestVO";
import {GOWServerRequestId} from "../../server/data/GOWServerRequestId";
import {GOWBaseServerCommand} from "../../server/commands/GOWBaseServerCommand";
import {GOWUsersModel} from "../../users/models/GOWUsersModel";
import {getInstance} from "fsuite";

export class GOWGeneratorStartProductionServerCommand extends GOWBaseServerCommand<IServerResponseVO, IGeneratorStartRequestVO> {

    constructor(generatorId: string) {
        super(
            {
                requestId: GOWServerRequestId.GENERATOR_START,
                generatorId: generatorId
            } as IGeneratorStartRequestVO
        );
    }

}