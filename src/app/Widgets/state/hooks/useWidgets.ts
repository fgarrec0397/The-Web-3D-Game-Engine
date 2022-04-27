import { useContext, useEffect, useState } from "react";
import { Object3D } from "three";
import serializeVector3 from "../../../Common/utils/serializeVector3";
import uidGenerator from "../../../Common/utils/uidGenerator";
import { useAppDispatch, useAppSelector } from "../../../Core/store";
import { WidgetSceneObject, WidgetProperties } from "../../types";
import { WidgetsContext } from "../WidgetsProvider";
import {
    addWidgetDictionary,
    updateWidgetDictionary,
    setCurrentWidgetProperties,
    setSelected,
} from "../widgetsReducer";

export default () => {
    const dispatch = useAppDispatch();
    const { selected, currentWidgetProperties } = useAppSelector((state) => state.widgets);
    const { widgets, setWidgets } = useContext(WidgetsContext);
    const [currentWidgetsState, setCurrentWidgetsState] = useState<WidgetSceneObject[]>([]);

    useEffect(() => {
        // TODO -- Check an optimized version to get the current widgets ---> O(n) instead of O(n^2)
        const currentWidgets = widgets.filter((x) => {
            if (x.id) {
                return selected.indexOf(x.id) !== -1;
            }

            return false;
        });

        setCurrentWidgetsState(currentWidgets);
    }, [selected, widgets]);

    const addWidget = (widget: WidgetSceneObject) => {
        const newWidget = { ...widget };
        newWidget.id = uidGenerator(); // assign id on initialisation

        const defaultProperties: WidgetProperties = {
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            scale: [1, 1, 1],
        };

        dispatch(
            addWidgetDictionary({
                id: newWidget.id,
                properties: defaultProperties,
            })
        );

        setWidgets([...widgets, newWidget]);
    };

    const getWidgetById = (id: string | undefined) => {
        if (id) {
            return widgets.find((x: any) => x.id === id);
        }
    };

    const selectWidget = (widget: WidgetSceneObject, isMultipleSelect: boolean) => {
        if (widget.id) {
            dispatch(setSelected({ newSelectedId: widget.id, isMultipleSelect }));
        }
    };

    const updateCurrentWidget = (
        widgetProperties: WidgetProperties,
        updateOnlyProperties = false
    ) => {
        if (!updateOnlyProperties) {
            const currentWidget = currentWidgetsState[0];

            if (currentWidget.id) {
                dispatch(
                    updateWidgetDictionary({
                        id: currentWidget.id,
                        properties: widgetProperties,
                    })
                );
            }
        }

        dispatch(setCurrentWidgetProperties(widgetProperties));
    };

    const updateCurrentWidgetWithMesh = (
        mesh: Object3D | undefined,
        updateOnlyProperties = false
    ) => {
        if (mesh) {
            updateCurrentWidget(
                {
                    position: serializeVector3(mesh.position),
                    rotation: serializeVector3(mesh.rotation),
                    scale: serializeVector3(mesh.scale),
                },
                updateOnlyProperties
            );
        }
    };

    return {
        currentWidgets: currentWidgetsState,
        firstCurrentWidget: currentWidgetsState[0], // TODO - Remove this
        currentWidgetProperties,
        widgets,
        addWidget,
        getWidgetById,
        selectWidget,
        updateCurrentWidget,
        updateCurrentWidgetWithMesh,
    };
};
