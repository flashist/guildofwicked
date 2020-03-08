import {ObjectTools} from "fcore";
import {Point, HtmlTools, FApp} from "fsuite";

import {BaseManager} from "../../base/managers/BaseManager";
import {RendererModuleConstants} from "../RendererModuleConstants";
import {Facade} from "../../facade/Facade";
import {RendererManagerEvents} from "../events/RendererManagerEvents";

export class RendererManager extends BaseManager {

    protected targetFps: number;

    protected construction(targetFps?: number): void {
        super.construction();

        if (this.targetFps) {
            PIXI.settings.TARGET_FPMS = this.targetFps / 1000;
        }

        const screenSize: Point = HtmlTools.getDocumentSize();
        // Init the graphics app
        let tempSettings = {
            width: screenSize.x,
            height: screenSize.y
            // resolution: window.devicePixelRatio
        };
        ObjectTools.copyProps(tempSettings, RendererModuleConstants.appSettings);
        Facade.instance.app = new FApp(tempSettings);

        // Stage
        Facade.instance.app.stage.interactive = true;

        // Renderer
        Facade.instance.app.renderer.autoResize = true;
        // CSS settings
        Facade.instance.app.renderer.view.style.position = "absolute";
        Facade.instance.app.renderer.view.style.top = "0px";
        Facade.instance.app.renderer.view.style.left = "0px";

        // Append the renderer canvas to DOM
        document.body.appendChild(Facade.instance.app.view);
    }

    public reside(width: number, height: number): void {
        this.dispatchEvent(RendererManagerEvents.BEFORE_RESIZE);

        Facade.instance.app.renderer.resize(
            width,
            height
        );

        this.dispatchEvent(RendererManagerEvents.AFTER_RESIZE);
    }

}