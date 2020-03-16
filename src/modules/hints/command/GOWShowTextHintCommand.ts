import {Align, FContainer, FLabel, getInstance, Point, VAlign} from "fsuite";

import {AnimateHintCommand} from "../../../appframework/hints/commands/AnimateHintCommand";
import {BaseAppCommand} from "../../../appframework/base/commands/BaseAppCommand";
import {GOWSettings} from "../../../GOWSettings";
import {IHintConfig} from "../../../appframework/hints/data/IHintConfig";
import {HintContainerId} from "../../../appframework/hints/data/HintContainerId";
import {ContainersManager} from "../../../appframework/containers/managers/ContainersManager";
import {Facade} from "../../../appframework/facade/Facade";
import {RendererManager} from "../../../appframework/renderer/managers/RendererManager";

export class GOWShowTextHintCommand extends BaseAppCommand {

    protected containersManager: ContainersManager = getInstance(ContainersManager);
    protected rendererManager: RendererManager = getInstance(RendererManager);

    constructor(protected text: string, protected config?: Partial<IHintConfig>) {
        super();
    }

    protected executeInternal(): void {
        const hint: FContainer = new FContainer();

        const hintLabel: FLabel = new FLabel(
            {
                fontFamily: "Clarence",
                size: 18,
                color: GOWSettings.colors.white,
                align: Align.CENTER,
                valign: VAlign.MIDDLE,

                autosize: true,

                stroke: GOWSettings.colors.black,
                strokeThickness: 1.5,

                dropShadow: true,
                dropShadowColor: GOWSettings.colors.black,
                dropShadowDistance: 0,
                dropShadowBlur: 4
            }
        );
        hint.addChild(hintLabel);
        //
        hintLabel.text = this.text;
        hintLabel.x = -1 * Math.floor(hintLabel.width / 2);
        hintLabel.y = -1 * Math.floor(hintLabel.height);

        if (!this.config.containerId) {
            this.config.containerId = HintContainerId;
        }
        const tempCont: FContainer = this.containersManager.getContainer(this.config.containerId);
        const localPos = tempCont.toLocal(this.config.startGlobalPos);
        const leftGlobalPos = tempCont.toGlobal(new Point(
            localPos.x - hint.width / 2
        ));
        const rightGlobalPos = tempCont.toGlobal(new Point(
            localPos.x + hint.width / 2
        ));

        if (leftGlobalPos.x < 0) {
            this.config.startGlobalPos.x += Math.ceil(-1 * leftGlobalPos.x);

        } else if (rightGlobalPos.x > this.rendererManager.rendererWidth) {
            const rightDelta: number = rightGlobalPos.x - this.rendererManager.rendererWidth;
            this.config.startGlobalPos.x = Math.floor(this.config.startGlobalPos.x - rightDelta);
        }


        new AnimateHintCommand(hint, this.config)
            .execute()
            .then(
                () => {
                    this.notifyComplete();
                }
            );
    }
}