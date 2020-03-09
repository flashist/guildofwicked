import {ResizableContainer} from "../../display/views/resize/ResizableContainer";
import {ViewLazyCreationServiceLocatorStack} from "../../display/views/viewstack/ViewLazyCreationServiceLocatorStack";

export class PagesView extends ResizableContainer {

    public viewStack: ViewLazyCreationServiceLocatorStack;

    protected construction(...args): void {
        super.construction(args);

        this.viewStack = new ViewLazyCreationServiceLocatorStack();
        this.addChild(this.viewStack);
    }

    protected arrange(): void {
        super.arrange();

        this.viewStack.resize(this.resizeSize.x, this.resizeSize.y);
    }
}