import {Align, AutosizeType, BaseDataVOEvent, FLabel, getInstance, getText, Graphics, VAlign} from "fsuite";

import {BaseView} from "../../../../appframework/base/views/BaseView";
import {GOWSettings} from "../../../../GOWSettings";
import {GOWUsersModel} from "../../../users/models/GOWUsersModel";
import {GOWResourceType} from "../../../resources/data/GOWResourceType";
import {SimpleButtonView} from "../../../../appframework/display/views/button/SimpleButtonView";
import {GOWTextTools} from "../../../texts/tools/GOWTextTools";
import {IGOWResourceVO} from "../../../resources/data/IGOWResourceVO";
import {GOWGamePageModel} from "../../models/GOWGamePageModel";
import {GOWGamePageModelEvent} from "../../events/GOWGamePageModelEvent";
import {GOWGamePageTabId} from "../../data/GOWGamePageTabId";

export class GOWGamePageHeaderView extends BaseView {

    protected usersModel: GOWUsersModel;
    protected gamePageModel: GOWGamePageModel;

    protected bg: Graphics;

    protected avatarPlaceholder: Graphics;
    protected moneyLabel: FLabel;
    protected premiumCurrenciesPlaceholderLabel: FLabel;

    public mapBtn: SimpleButtonView;
    public cityBtn: SimpleButtonView;

    protected construction(...args): void {
        super.construction(...args);

        this.usersModel = getInstance(GOWUsersModel);
        this.gamePageModel = getInstance(GOWGamePageModel);

        this.bg = new Graphics();
        this.addChild(this.bg);

        this.avatarPlaceholder = new Graphics();
        this.addChild(this.avatarPlaceholder);
        //
        this.avatarPlaceholder.beginFill(GOWSettings.colors.white);
        this.avatarPlaceholder.lineStyle(2, GOWSettings.colors.black, 1, 0);
        this.avatarPlaceholder.drawRect(0, 0, 110, 110);
        this.avatarPlaceholder.endFill();

        this.moneyLabel = new FLabel({
            fontFamily: "Clarence",
            size: 72,
            color: GOWSettings.colors.white,
            autosize: true,
            autosizeType: AutosizeType.HEIGHT,

            stroke: GOWSettings.colors.black,
            strokeThickness: 1.5,

            dropShadow: true,
            dropShadowColor: GOWSettings.colors.black,
            dropShadowDistance: 0,
            dropShadowBlur: 4
        });
        this.addChild(this.moneyLabel);

        this.premiumCurrenciesPlaceholderLabel = new FLabel({
            fontFamily: "Clarence",
            size: 24,
            color: GOWSettings.colors.greyLight,
            autosize: true,

            stroke: GOWSettings.colors.black,
            strokeThickness: 1.5,

            dropShadow: true,
            dropShadowColor: GOWSettings.colors.black,
            dropShadowDistance: 0,
            dropShadowBlur: 2
        });
        this.addChild(this.premiumCurrenciesPlaceholderLabel);
        //
        this.premiumCurrenciesPlaceholderLabel.text = getText("premiumCurrenciesPlaceholder");

        this.mapBtn = new SimpleButtonView(
            {
                bgConfig: {
                    vector: {
                        bgColor: GOWSettings.colors.white,
                        overBgColor: GOWSettings.colors.yellow,
                        bgAlpha: 1,
                        bgBorderColor: GOWSettings.colors.black,
                        bgBorderAlpha: 1,
                        bgBorderWidth: 2
                    },
                    resizeBg: true
                },
                labelConfig: {
                    fontFamily: "Clarence",
                    size: 48,
                    color: GOWSettings.colors.black,
                    autosize: true,
                    align: Align.CENTER,
                    valign: VAlign.MIDDLE
                }
            }
        );
        this.addChild(this.mapBtn);
        //
        this.mapBtn.resize(110, 110);
        this.mapBtn.text = getText("mapBtn");

        this.cityBtn = new SimpleButtonView(
            {
                bgConfig: {
                    vector: {
                        bgColor: GOWSettings.colors.white,
                        overBgColor: GOWSettings.colors.yellow,
                        bgAlpha: 1,
                        bgBorderColor: GOWSettings.colors.black,
                        bgBorderAlpha: 1,
                        bgBorderWidth: 2
                    },
                    resizeBg: true
                },
                labelConfig: {
                    fontFamily: "Clarence",
                    size: 48,
                    color: GOWSettings.colors.black,
                    autosize: true,
                    align: Align.CENTER,
                    valign: VAlign.MIDDLE
                }
            }
        );
        this.addChild(this.cityBtn);
        //
        this.cityBtn.resize(110, 110);
        this.cityBtn.text = getText("cityBtn");
    }


    protected addListeners(): void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            this.gamePageModel,
            GOWGamePageModelEvent.TAB_ID_CHANGE,
            this.onGamePageTabIdChange
        );

        this.eventListenerHelper.addEventListener(
            this.usersModel.curUserData,
            BaseDataVOEvent.CHANGE,
            this.onUserDataChange
        );
    }

    protected onGamePageTabIdChange(): void {
        this.commitData();
    }

    protected onUserDataChange(): void {
        this.commitData();
    }

    protected commitData(): void {
        super.commitData();

        if (this.usersModel.curUserData) {
            const userMoney: IGOWResourceVO = this.usersModel.curUserData.getResource(GOWResourceType.MONEY);
            this.moneyLabel.text = GOWTextTools.getFormattedResourceAmount(userMoney);
        }

        if (this.gamePageModel.tabId === GOWGamePageTabId.CITY) {
            this.mapBtn.visible = true;
            this.cityBtn.visible = false;
        } else {
            this.mapBtn.visible = false;
            this.cityBtn.visible = true;
        }
    }

    protected arrange(): void {
        super.arrange();

        if (this.bg.width === this.resizeSize.x && this.bg.height === this.resizeSize.y) {
            return;
        }

        this.bg.clear();
        //
        this.bg.beginFill(GOWSettings.colors.grey);
        this.bg.drawRect(0, 0, this.resizeSize.x, this.resizeSize.y);
        this.bg.endFill();

        this.avatarPlaceholder.x = Math.floor(this.bg.x + GOWSettings.layout.contentToBorderPadding);
        this.avatarPlaceholder.y = Math.floor(this.bg.y + GOWSettings.layout.contentToBorderPadding);

        this.mapBtn.x = Math.floor(this.bg.x + this.bg.width - this.mapBtn.width - GOWSettings.layout.contentToBorderPadding);
        this.mapBtn.y = Math.floor(this.bg.y + GOWSettings.layout.contentToBorderPadding);

        this.cityBtn.x = Math.floor(this.bg.x + this.bg.width - this.cityBtn.width - GOWSettings.layout.contentToBorderPadding);
        this.cityBtn.y = Math.floor(this.bg.y + GOWSettings.layout.contentToBorderPadding);

        this.moneyLabel.x = Math.floor(this.avatarPlaceholder.x + this.avatarPlaceholder.width) + 15;
        this.moneyLabel.y = this.avatarPlaceholder.y;
        this.moneyLabel.width = this.mapBtn.x - this.moneyLabel.x - 15;

        this.premiumCurrenciesPlaceholderLabel.x = this.moneyLabel.x;
        this.premiumCurrenciesPlaceholderLabel.y = Math.floor(this.avatarPlaceholder.y + this.avatarPlaceholder.height - this.premiumCurrenciesPlaceholderLabel.height);
    }
}