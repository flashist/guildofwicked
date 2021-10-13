import {Align, AutosizeType, DisplayResizeTools, FContainer, FLabel, getText, Graphics, Point, VAlign} from "@flashist/flibs";

import {TweenLite} from "gsap";

import {BaseView} from "../../../appframework/base/views/BaseView";
import {SimpleButtonView} from "../../../appframework/display/views/button/SimpleButtonView";
import {GOWSettings} from "../../../GOWSettings";

/**
 * The class is used for the prototype-puprose only,
 * in real-life cases more complex windows-based solutions
 * would be implemeted.
 */
export class GOWSimplePopupView extends BaseView {

    public modalBg: Graphics;
    protected contentCont: FContainer;
    protected contentInsideCont: FContainer;
    protected contentBg: Graphics;
    protected contentLabel: FLabel;
    public closeBtn: SimpleButtonView;

    protected construction(...args): void {
        super.construction(...args);

        this.modalBg = new Graphics();
        this.addChild(this.modalBg);
        //
        this.modalBg.beginFill(0x000000, 0.75);
        this.modalBg.drawRect(0, 0, 100, 100);
        this.modalBg.endFill();
        //
        this.modalBg.interactive = true;

        this.contentCont = new FContainer();
        this.addChild(this.contentCont);
        //`
        this.contentCont.interactive = true;

        this.contentBg = new Graphics();
        this.contentCont.addChild(this.contentBg);
        //
        this.contentBg.beginFill(GOWSettings.colors.white);
        this.contentBg.lineStyle(2, GOWSettings.colors.black, 1, 0);
        this.contentBg.drawRect(0, 0, 90, 50);
        this.contentBg.endFill();

        this.contentInsideCont = new FContainer();
        this.contentCont.addChild(this.contentInsideCont);

        this.contentLabel = new FLabel(
            {
                fontFamily: "Clarence",
                size: 18,
                color: GOWSettings.colors.black,
                align: Align.CENTER,
                valign: VAlign.MIDDLE,
                autosize: true,
                autosizeType: AutosizeType.HEIGHT,

                stroke: GOWSettings.colors.white,
                strokeThickness: 1.5,

                dropShadow: true,
                dropShadowColor: GOWSettings.colors.white,
                dropShadowDistance: 0,
                dropShadowBlur: 4
            }
        );
        this.contentInsideCont.addChild(this.contentLabel);
        //
        this.contentLabel.width = 500;

        this.closeBtn = new SimpleButtonView(
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
                    size: 18,
                    color: GOWSettings.colors.black,
                    fieldPadding: new Point(4, 0),
                    align: Align.CENTER,
                    valign: VAlign.MIDDLE
                }
            }
        );
        this.contentInsideCont.addChild(this.closeBtn);
        //
        this.closeBtn.resize(50, 25);

        this.visible = false;
    }

    public show(text: string): void {
        this.contentLabel.text = text;
        this.closeBtn.text = getText("close");

        this.visible = true;
        this.interactiveChildren = true;

        TweenLite.killTweensOf(this);
        TweenLite.to(
            this,
            0.5,
            {
                alpha: 1
            }
        );

        this.arrange();
    }

    public hide(): void {
        this.interactiveChildren = false;

        TweenLite.killTweensOf(this);
        TweenLite.to(
            this,
            0.5,
            {
                alpha: 0,
                onComplete: () => {
                    this.visible = false;
                }
            }
        );
    }

    protected arrange(): void {
        super.arrange();

        this.modalBg.width = Math.ceil(this.resizeSize.x);
        this.modalBg.height = Math.ceil(this.resizeSize.y);

        this.closeBtn.x = this.contentLabel.x + Math.floor((this.contentLabel.width - this.closeBtn.width) / 2);
        this.closeBtn.y = this.contentLabel.y + this.contentLabel.height + GOWSettings.layout.contentToBorderPadding;

        this.contentBg.width = this.contentInsideCont.width + GOWSettings.layout.contentToBorderPadding * 2;
        this.contentBg.height = this.contentInsideCont.height + GOWSettings.layout.contentToBorderPadding * 2;

        this.contentInsideCont.x = GOWSettings.layout.contentToBorderPadding;
        this.contentInsideCont.y = GOWSettings.layout.contentToBorderPadding;

        this.contentCont.scale.set(1);
        //
        const tempScale: number = DisplayResizeTools.getScale(
            this.contentCont.width,
            this.contentCont.height,
            this.resizeSize.x,
            this.resizeSize.y
        );
        this.contentCont.scale.set(tempScale);

        this.contentCont.x = this.modalBg.x + Math.floor((this.modalBg.width - this.contentCont.width) / 2);
        this.contentCont.y = this.modalBg.y + Math.floor((this.modalBg.height - this.contentCont.height) / 2);
    }
}