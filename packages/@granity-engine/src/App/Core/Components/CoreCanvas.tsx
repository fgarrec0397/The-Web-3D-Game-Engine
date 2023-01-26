import canvasConfig from "@granity-engine/App/Core/configs/canvas";
import Scenes from "@granity-engine/App/Scenes/Scenes";
import { useContextBridge } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Context, FC } from "react";
import { useTheme } from "styled-components";

import useCore from "../_actions/hooks/useCore";

type Props = {
    contexts: Context<any>[];
};

const CoreCanvas: FC<Props> = ({ contexts }) => {
    const theme = useTheme();
    const { onCorePointerMissed } = useCore();
    const ContextBridge = useContextBridge(...contexts);

    const onPointerMissed = (event: MouseEvent) => {
        onCorePointerMissed(event);
    };

    return (
        <Canvas
            style={{
                background: theme.common.canvas.background,
            }}
            {...canvasConfig}
            onPointerMissed={onPointerMissed}
        >
            <ContextBridge>
                <Scenes />
            </ContextBridge>
        </Canvas>
    );
};

export default CoreCanvas;