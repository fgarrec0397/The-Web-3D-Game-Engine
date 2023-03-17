import { createWidget, EditableWidget, FeaturesState, WidgetType } from "@granity/engine";
import { FC } from "react";

import widgetStarter2Reducer from "./_actions/_data/state/widgetStarter2Reducer";
import useWidgetStarter2Init from "./_actions/hooks/useWidgetStarter2Init";

export type WidgetStarter2Props = EditableWidget;

const test: FeaturesState = {
    widgetStarter2: {
        widgetStarter2Message: "test",
    },
};

const WidgetStarter2: FC<WidgetStarter2Props> = () => {
    useWidgetStarter2Init();

    return (
        <mesh position={[0, 0, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="pink" />
        </mesh>
    );
};

export const widget = createWidget({
    component: WidgetStarter2,
    reducer: widgetStarter2Reducer,
    type: WidgetType.GameObject,
    name: "WidgetStarter2",
});