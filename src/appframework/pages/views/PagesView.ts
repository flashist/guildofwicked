import {ResizableContainer} from "../../display/views/resize/ResizableContainer";
import {ViewStackLazyCreationServiceLocator} from "../../display/views/viewstack/ViewStackLazyCreationServiceLocator";

export class PagesView extends ResizableContainer {

    public viewStack: ViewStackLazyCreationServiceLocator;

    protected construction(...args): void {
        super.construction(args);

        this.viewStack = new ViewStackLazyCreationServiceLocator();
        this.addChild(this.viewStack);
    }

    protected arrange(): void {
        super.arrange();

        this.viewStack.resize(this.resizeSize.x, this.resizeSize.y);
    }
}