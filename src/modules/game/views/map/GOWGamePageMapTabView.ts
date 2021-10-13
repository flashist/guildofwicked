import {Texture, FLabel, Sprite, InteractiveEvent, getText} from "@flashist/flibs";

import {TweenLite} from "gsap";

import {BaseView} from "../../../../appframework/base/views/BaseView";
import {GOWSettings} from "../../../../GOWSettings";

export class GOWGamePageMapTabView extends BaseView {

    protected infoLabel: FLabel;
    protected mapMockup: Sprite;

    protected infoSlideIds: string[];
    protected curSlideIndex: number;
    protected slideImage: Sprite;

    protected construction(...args): void {
        super.construction(...args);

        this.interactive = true;

        this.infoSlideIds = [
            "slide-1.png",
            "slide-2.png",
            "slide-3.png",
            "slide-4.png",
            "slide-5.png",
            ""
        ];
        this.curSlideIndex = 0;

        this.mapMockup = Sprite.from("map-page-mockup.png");
        this.addChild(this.mapMockup);

        this.slideImage = new Sprite();
        this.addChild(this.slideImage);

        this.infoLabel = new FLabel({
            fontFamily: "Clarence",
            size: 48,
            color: GOWSettings.colors.white,
            autosize: true,

            stroke: GOWSettings.colors.black,
            strokeThickness: 1.5,

            dropShadow: true,
            dropShadowColor: GOWSettings.colors.black,
            dropShadowDistance: 0,
            dropShadowBlur: 2
        });
        this.addChild(this.infoLabel);
        //
        this.infoLabel.alpha = 0;
        this.infoLabel.text = getText("mapMockupInfo");
        //
        this.animateInfoLabel();
    }

    protected onAddedToStage(): void {
        super.onAddedToStage();

        this.curSlideIndex = 0;
        this.commitSlideData();
    }

    protected addListeners(): void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            this,
            InteractiveEvent.TAP,
            this.onTap
        );
    }

    protected onTap(): void {
        this.showNextSlide();
    }

    protected showNextSlide(): void {
        this.curSlideIndex++;
        if (this.curSlideIndex >= this.infoSlideIds.length) {
            this.curSlideIndex = 0;
        }

        this.commitSlideData();
    }

    protected commitSlideData(): void {
        const spriteId: string = this.infoSlideIds[this.curSlideIndex];
        if (spriteId) {
            this.slideImage.visible = true;
            this.slideImage.texture = Texture.from(spriteId);
        } else {
            this.slideImage.visible = false;
        }

        this.arrange();
    }
    
    protected arrange(): void {
        super.arrange();

        this.mapMockup.x =  Math.floor((this.resizeSize.x - this.mapMockup.width) / 2);
        this.mapMockup.y =  Math.floor((this.resizeSize.y - this.mapMockup.height) / 2);

        this.slideImage.x =  Math.floor((this.resizeSize.x - this.slideImage.width) / 2);
        this.slideImage.y =  Math.floor((this.resizeSize.y - this.slideImage.height) / 2);

        this.infoLabel.x =  Math.floor((this.resizeSize.x - this.infoLabel.width) / 2);
        this.infoLabel.y =  Math.floor((this.resizeSize.y - this.infoLabel.height) / 2) - 500;
    }

    protected animateInfoLabel(): void {
        TweenLite.killTweensOf(this.infoLabel);
        TweenLite.to(
            this.infoLabel,
            4,
            {
                delay: 2,
                alpha: 0.5,
                onComplete: () => {
                    TweenLite.to(
                        this.infoLabel,
                        4,
                        {
                            alpha: 0,
                            onComplete: () => {
                                this.animateInfoLabel();
                            }
                        }
                    )
                }
            }
        )
    }
}