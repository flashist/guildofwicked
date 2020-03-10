import {FContainer, FLabel, Graphics, InteractiveEvent} from "fsuite";

import {ISimpleButtonConfig} from "./ISimpleButtonConfig";
import {SimpleButtonState} from "./SimpleButtonState";
import {ResizableContainer} from "../resize/ResizableContainer";
import {IToggableItem} from "../togglegroup/IToggableItem";

export class SimpleButtonView<DataType extends object = object> extends ResizableContainer<DataType> implements IToggableItem {

    public id: string;

    private _enabled: boolean;
    protected _state: string;
    protected _selected: boolean;

    protected config: ISimpleButtonConfig;

    protected contentCont: FContainer;
    protected bg: Graphics;
    protected label: FLabel;

    constructor(config: ISimpleButtonConfig) {
        super(config);
    }

    protected construction(config: ISimpleButtonConfig): void {
        super.construction();

        this.config = config;

        this.contentCont = new FContainer();
        this.addChild(this.contentCont);

        this.bg = new Graphics();
        this.contentCont.addChild(this.bg);

        this.label = new FLabel(this.config.labelConfig);
        this.contentCont.addChild(this.label);

        this.state = SimpleButtonState.NORMAL;
        this.enabled = true;
    }

    protected addListeners(): void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            this,
            InteractiveEvent.OVER,
            this.onOver
        );
        this.eventListenerHelper.addEventListener(
            this,
            InteractiveEvent.OUT,
            this.onOut
        );
        this.eventListenerHelper.addEventListener(
            this,
            InteractiveEvent.TAP,
            this.onClick
        );
        this.eventListenerHelper.addEventListener(
            this,
            InteractiveEvent.UP_OUTSIDE,
            this.onOut
        );
    }

    private onOver(): void {
        // this.contentCont.alpha = 1;
        this.state = this.findStateValue(SimpleButtonState.OVER);
    }

    private onOut(): void {
        // this.contentCont.alpha = 0.75;
        this.state = this.findStateValue(SimpleButtonState.NORMAL);
    }

    protected onClick(): void {
        this.onOut();
    }

    protected arrange(): void {
        super.arrange();

        /*this.bg.width = this.resizeSize.x;
        this.bg.height = this.resizeSize.y;*/

        if (this.bg.width !== this.resizeSize.x ||
            this.bg.height !== this.resizeSize.y) {

            this.bg.beginFill(this.config.bgConfig.bgColor, this.config.bgConfig.bgAlpha);
            this.bg.lineStyle(
                this.config.bgConfig.bgBorderWidth,
                this.config.bgConfig.bgBorderColor,
                this.config.bgConfig.bgBorderAlpha
            );
            this.bg.drawRect(0, 0, this.resizeSize.x, this.resizeSize.y);

        }

        this.label.width = this.bg.width;
        this.label.height = this.bg.height;
        this.label.x = this.bg.x + Math.floor((this.bg.width - this.label.width) / 2);
        this.label.y = this.bg.y + Math.floor((this.bg.height - this.label.height) / 2);
    }

    get enabled(): boolean {
        return this._enabled;
    }
    set enabled(value: boolean) {
        if (value === this._enabled) {
            return;
        }

        this._enabled = value;

        this.commitData();
    }

    public get text(): string {
        return this.label.text;
    }
    public set text(value: string) {
        this.label.text = value;
        this.arrange();
    }

    public get state(): string {
        return this._state;
    }
    public set state(value: string) {
        if (value == this.state) {
            return;
        }

        this._state = value;

        this.commitData();
    }

    protected commitData(): void {
        super.commitData();

        if (this.enabled) {
            this.interactive = true;

            if (this.state === SimpleButtonState.NORMAL || this.state === SimpleButtonState.SELECTED_NORMAL) {
                this.alpha = 0.5;
            } else if (this.state === SimpleButtonState.OVER || this.state === SimpleButtonState.SELECTED_OVER) {
                this.alpha = 1;
            }

        } else {
            this.interactive = false;
            this.alpha = 0.5;
        }
    }

    public get selected(): boolean {
        return this._selected;
    }
    public set selected(value: boolean) {
        if (value == this.selected) {
            return;
        }

        this._selected = value;

        this.state = this.findStateValue(SimpleButtonState.SELECTED_NORMAL);
    }

    protected findStateValue(normalState: string): string {
        let result: string;

        if (this.selected) {
            result = SimpleButtonState.NORMAL_TO_SELECTED_MAP[normalState];
        }

        if (!result) {
            result = normalState;
        }

        return result;
    }
}