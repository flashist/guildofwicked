import {BaseModel} from "../../../appframework/base/models/BaseModel";
import {GOWUserVO} from "../data/GOWUserVO";
import {GOWUserVOType} from "../data/GOWUserVOType";

export class GOWUsersModel extends BaseModel<GOWUserVO> {

    // public curUserId: string;
    // TEST user id data
    public curUserId: string = "1";

    protected construction(): void {
        super.construction();

        this.itemsType = GOWUserVOType;
        this.DefaultItemClass = GOWUserVO;
    }

    public get curUserData(): GOWUserVO {
        return this.getItem(this.curUserId);
    }

}