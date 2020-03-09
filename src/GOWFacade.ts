import {FApp, Point, HtmlTools} from "fsuite";

import {Facade} from "./appframework/facade/Facade";
import {IFacadeOptions} from "./appframework/facade/IFacadeOptions";
import {AppMainContainer} from "./appframework/display/views/maincontainer/AppMainContainer";
import {InitApplicationCommand} from "./modules/init/commands/InitApplicationCommand";

export class GOWFacade extends Facade {

    protected resizeListener: any;

    protected mainContainer: AppMainContainer;

    protected construction(options: IFacadeOptions): void {
        super.construction(options);

        this.mainContainer = new AppMainContainer();
        FApp.instance.stage.addChild(this.mainContainer);

        new InitApplicationCommand()
            .execute();
    }

    protected addListeners(): void {
        this.resizeListener = this.onResize.bind(this);
        window.addEventListener(
            "resize",
            this.resizeListener
        );
    }

    protected onResize(): void {
        this.arrange();
    }

    protected arrange(): void {
        const screenSize: Point = HtmlTools.getDocumentSize();
        Facade.instance.app.renderer.resize(
            screenSize.x,
            screenSize.y
        );

        this.mainContainer.resize(
            Facade.instance.app.renderer.view.width,
            Facade.instance.app.renderer.view.height
        );
    }

}