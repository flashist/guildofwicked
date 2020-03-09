import {FContainer, FLabel, getInstance, getText, Graphics, Sprite, Texture} from "fsuite";

import {TweenLite} from "gsap";

import {GOWSettings} from "../../../GOWSettings";
import {GOWBasePageView} from "../../pages/views/GOWBasePageView";
import {GlobalEventDispatcher} from "../../../appframework/globaleventdispatcher/dispatcher/GlobalEventDispatcher";
import {GOWPreloaderPageViewEvent} from "./GOWPreloaderPageViewEvent";

export class GOWPreloaderPageView extends GOWBasePageView {

    protected globalDispatcher: GlobalEventDispatcher = getInstance(GlobalEventDispatcher);

    protected contentCont: FContainer;

    protected titleField: FLabel;
    protected progressLabel: FLabel;

    protected progressBg: Sprite;
    protected progressBar: Sprite;
    protected progressBarMask: Graphics;

    protected _loadingProgress: number = 0;
    private _viewProgress: number = 0;

    protected construction(...args): void {
        this.bgColor = GOWSettings.colors.white;

        super.construction(...args);

        this.titleField = new FLabel({
            fontFamily: "Clarence",
            size: 72,
            color: GOWSettings.colors.black,
            autosize: true
        });
        this.contentCont.addChild(this.titleField);
        this.titleField.text = getText("gameName");
        this.titleField.x = this.sizeArea.x + Math.floor((this.sizeArea.width - this.titleField.width) / 2);
        this.titleField.y = 510;

        this.progressBg = Sprite.from("loading_bar_transparent.png");
        this.contentCont.addChild(this.progressBg);
        //
        this.progressBg.x = this.sizeArea.x + Math.floor((this.sizeArea.width - this.progressBg.width) / 2);
        this.progressBg.y = this.titleField.y + this.titleField.height + 100;

        this.progressBar = Sprite.from("loading_bar_grey.png");
        this.contentCont.addChild(this.progressBar);
        //
        this.progressBar.x = this.progressBg.x;
        this.progressBar.y = this.progressBg.y;

        this.progressBarMask = new Graphics();
        this.contentCont.addChild(this.progressBarMask);
        //
        this.progressBarMask.beginFill(0xFF0000, 0.5);
        this.progressBarMask.drawRect(
            0,
            0,
            this.progressBar.width,
            this.progressBar.height
        );
        //
        this.progressBarMask.x = this.progressBar.x;
        this.progressBarMask.y = this.progressBar.y;
        //
        this.progressBar.mask = this.progressBarMask;

        this.viewProgress = 0;

        /*this.tapToPlayBtn = new Sprite();
        this.tapToPlayBtn.texture = Texture.fromFrame("tap_to_play");
        this.contentCont.addChild(this.tapToPlayBtn);
        this.tapToPlayBtn.x = this.sizeArea.x + Math.floor((this.sizeArea.width - this.tapToPlayBtn.width) / 2);
        this.tapToPlayBtn.y = Math.floor(this.titleField.y + this.titleField.height + 100);*/

        /*this.tapToPlayField = new FLabel({
            fontFamily: "PT Serif",
            size: 64,
            color: 0xfff6e8,
            bold: true,
            autosize: true,
            dropShadow: true
        });
        this.contentCont.addChild(this.tapToPlayField);
        // this.tapToPlayField.text = "TAP TO PLAY";
        this.tapToPlayField.text = getText("tapToPlay");
        this.tapToPlayField.alpha = 0.75;
        this.tapToPlayField.x = this.sizeArea.x + Math.floor((this.sizeArea.width - this.tapToPlayField.width) / 2);
        this.tapToPlayField.y = Math.floor(this.titleField.y + this.titleField.height) + 100;

        this.playBtn = getInstance(PlayButtonControllerView);
        this.contentCont.addChild(this.playBtn);
        this.playBtn.x = this.sizeArea.x + Math.floor((this.sizeArea.width - this.playBtn.width) / 2);
        this.playBtn.y = this.tapToPlayField.y + this.tapToPlayField.height;*/
    }

    public get loadingProgress(): number {
        return this._loadingProgress;
    }
    public set loadingProgress(value: number) {
        if (value === this._loadingProgress) {
            return;
        }

        this._loadingProgress = value;

        TweenLite.killTweensOf(this);
        TweenLite.to(
            this,
            0.5,
            {
                viewProgress: this.loadingProgress
            }
        );
    }

    get viewProgress(): number {
        return this._viewProgress;
    }
    set viewProgress(value: number) {
        this._viewProgress = value;

        this.progressBarMask.width = this.progressBar.width * this._viewProgress;

        if (this.viewProgress >= 1) {
            this.globalDispatcher.dispatchEvent(GOWPreloaderPageViewEvent.PROGRESS_COMPLETE);
        }
    }
}