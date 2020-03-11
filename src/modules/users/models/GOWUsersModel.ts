import {BaseModel} from "../../../appframework/base/models/BaseModel";
import {GOWUserVO} from "../data/GOWUserVO";
import {GOWUserVOType} from "../data/GOWUserVOType";

export class GOWUsersModel extends BaseModel<GOWUserVO> {

    public curUserId: string;
    // TEST PURPOSE: in real-life cases this param is passed to the client-side
    // application by some of the auth methods (e.g. social-networks API, website login form, etc.)
    public loginData: string = "some-login-data";

    protected construction(): void {
        super.construction();

        this.itemsType = GOWUserVOType;
        this.DefaultItemClass = GOWUserVO;
    }

    public get curUserData(): GOWUserVO {
        return this.getItem(this.curUserId);
    }

}