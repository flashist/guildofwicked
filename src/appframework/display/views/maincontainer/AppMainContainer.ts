import {ResizableContainer} from "../resize/ResizableContainer";

import {PagesView} from "../../../pages/views/PagesView";

export class AppMainContainer extends ResizableContainer {

    protected pagesView: PagesView;

    protected construction(...args): void {
        super.construction(...args);

        this.pagesView = new PagesView();
        this.addChild(this.pagesView);
    }

    protected arrange(): void {
        super.arrange();

        this.pagesView.resize(
            this.width,
            this.height
        );
    }
}