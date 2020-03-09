import {GOWSettings} from "../../../GOWSettings";
import {GOWBasePageView} from "../../pages/views/GOWBasePageView";

export class GOWPreloaderPageView extends GOWBasePageView {

    protected construction(...args): void {
        this.bgColor = GOWSettings.colors.white;

        super.construction(...args);
    }

    /*protected globalDispatcher: GlobalEventDispatcher = getInstance(GlobalEventDispatcher);

    protected contentCont: FContainer;

    protected titleField: FLabel;
    protected progressLabel: FLabel;

    protected progressBg: Sprite;
    protected progressBar: Sprite;
    protected progressBarMask: Graphics;

    protected _loadingProgress: number = 0;
    private _viewProgress: number = 0;

    protected construction(...args): void {
        super.construction(args);

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

        /!*this.progressBarBg = new Graphics();
        this.contentCont.addChild(this.progressBarBg);
        this.progressBarBg.beginFill(0x999999);
        this.progressBarBg.drawRoundedRect(0, 0, 800, 75, 25);*!/
        this.progressBg = new Sprite();
        this.progressBg.texture = Texture.fromFrame("progress_bar_bg.png");
        this.contentCont.addChild(this.progressBg);
        //
        this.progressBg.x = this.sizeArea.x + Math.floor((this.sizeArea.width - this.progressBg.width) / 2);
        this.progressBg.y = this.titleField.y + this.titleField.height + 100;

        this.progressBarLine = new Sprite();
        this.progressBarLine.texture = Texture.fromFrame("progress_bar_inner_line.png");
        this.contentCont.addChildAt(this.progressBarLine, 0);
        //
        this.progressBarLine.x = this.sizeArea.x + Math.floor((this.sizeArea.width - this.progressBarLine.width) / 2);
        this.progressBarLine.y = this.progressBg.y + Math.floor((this.progressBg.height - this.progressBarLine.height) / 2);

        this.progressBarMask = new Graphics();
        this.contentCont.addChild(this.progressBarMask);
        //
        this.progressBarMask.beginFill(0xFF0000, 0.5);
        this.progressBarMask.drawRoundedRect(
            0,
            0,
            this.progressBarLine.width,
            this.progressBarLine.height + 10,
            20
        );
        //
        this.progressBarMask.x = this.progressBarLine.x;
        this.progressBarMask.y = this.progressBarLine.y;
        //
        this.progressBarLine.mask = this.progressBarMask;

        this.progressBar = new Sprite();
        this.progressBar.texture = Texture.fromFrame("progress_bar_inner_bg.png");
        this.contentCont.addChildAt(this.progressBar, 0);
        //
        this.progressBar.x = this.sizeArea.x + Math.floor((this.sizeArea.width - this.progressBar.width) / 2);
        this.progressBar.y = this.progressBg.y + Math.floor((this.progressBg.height - this.progressBar.height) / 2);

        this.viewProgress = 0;

        /!*this.tapToPlayBtn = new Sprite();
        this.tapToPlayBtn.texture = Texture.fromFrame("tap_to_play");
        this.contentCont.addChild(this.tapToPlayBtn);
        this.tapToPlayBtn.x = this.sizeArea.x + Math.floor((this.sizeArea.width - this.tapToPlayBtn.width) / 2);
        this.tapToPlayBtn.y = Math.floor(this.titleField.y + this.titleField.height + 100);*!/

        /!*this.tapToPlayField = new FLabel({
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
        this.playBtn.y = this.tapToPlayField.y + this.tapToPlayField.height;*!/
    }

    public get loadingProgress(): number {
        return this._loadingProgress;
    }
    public set loadingProgress(value: number) {
        if (value === this._loadingProgress) {
            return;
        }

        this._loadingProgress = value;

        // this.progressBarLine.x = this.progressBarInnerBg.x - (this.progressBarLine.width * (1 - this.loadingProgress));
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

        this.progressBarLine.x = this.progressBar.x - (this.progressBarLine.width * (1 - this._viewProgress));

        if (this.viewProgress >= 1) {
            // // alert"PreloadPageView | onProgressComplete");

            // this.emit(PreloadPageViewEvent.PROGRESS_COMPLETE);
            this.globalDispatcher.dispatchEvent(PreloaderPageViewEvent.PROGRESS_COMPLETE);
        }
    }*/
}