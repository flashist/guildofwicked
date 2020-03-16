import {Align, AutosizeType, FContainer, FLabel, ServiceLocatorObjectsPool, VAlign} from "fsuite";

import {AnimateHintCommand} from "../../../appframework/hints/commands/AnimateHintCommand";
import {BaseAppCommand} from "../../../appframework/base/commands/BaseAppCommand";
import {GOWSettings} from "../../../GOWSettings";
import {IHintConfig} from "../../../appframework/hints/data/IHintConfig";

export class GOWShowTextHintCommand extends BaseAppCommand {

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
        hintLabel.text = this.text;

        hint.addChild(hintLabel);
        hintLabel.x = -1 * Math.floor(hintLabel.width / 2);
        hintLabel.y = -1 * Math.floor(hintLabel.height);

        new AnimateHintCommand(hint, this.config)
            .execute()
            .then(
                () => {
                    this.notifyComplete();
                }
            );
    }
}