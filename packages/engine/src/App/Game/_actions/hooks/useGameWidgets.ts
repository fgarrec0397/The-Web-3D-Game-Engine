import { useWidgets, useWidgetsModules, WidgetType } from "@engine/api";
import useUI from "@engine/App/UI/_actions/hooks/useUI";
import selectedWidgetsFilter from "@engine/App/Widgets/_actions/filters/selectedWidgetsFilter";
import widgetsFilter from "@engine/App/Widgets/_actions/filters/widgetsFilter";
import widgetsIdsFilter from "@engine/App/Widgets/_actions/filters/widgetsIdsFilter";
import widgetsInfoFilter from "@engine/App/Widgets/_actions/filters/widgetsInfoFilter";
import widgetsModulesFilter from "@engine/App/Widgets/_actions/filters/widgetsModulesFilter";
import { Object3D } from "@granity/three";
import { useCallback, useMemo } from "react";

import { gameWidgetPrefix } from "../gameConstants";
import {
    GameWidgetDictionary,
    GameWidgetDictionaryItem,
    GameWidgetInfoDictionary,
    GameWidgetModule,
    GameWidgetOptionsValues,
    GameWidgetValueParameter,
} from "../gameTypes";
import {
    buildGameWidgetInfo,
    buildWidgetDictionaryProperties,
} from "../utilities/buildGameWidgetInfoDictionary";

export default () => {
    const {
        widgets,
        widgetsIds,
        widgetsInfoDictionary,
        addWidget,
        updateWidget,
        getWidgetById,
        selectWidget,
        selectedWidgets,
        copyWidget,
    } = useWidgets();
    const { widgetsModules } = useWidgetsModules();
    const { updateSelectedWidgetProperties } = useUI();

    const selectedGameWidgets = useMemo(
        () =>
            selectedWidgetsFilter<GameWidgetDictionaryItem>(selectedWidgets, WidgetType.GameObject),
        [selectedWidgets]
    );

    const gameWidgets = useMemo(
        () => widgetsFilter<GameWidgetDictionary>(widgets, WidgetType.GameObject),
        [widgets]
    );

    const gameWidgetsModules = useMemo(
        () => widgetsModulesFilter<GameWidgetModule>(widgetsModules, WidgetType.GameObject),
        [widgetsModules]
    );

    const gameWidgetsInfo = useMemo(
        () =>
            widgetsInfoFilter<GameWidgetInfoDictionary>(
                widgetsInfoDictionary,
                widgets,
                WidgetType.GameObject
            ),
        [widgets, widgetsInfoDictionary]
    );
    const gameWidgetsIds = useMemo(
        () => widgetsIdsFilter(widgets, widgetsIds, WidgetType.GameObject),
        [widgets, widgetsIds]
    );

    const getGameWidgetById = useCallback(
        (id: string | undefined) => {
            if (id) {
                return gameWidgets[id];
            }
        },
        [gameWidgets]
    );

    const getGameWidgetInfoById = useCallback(
        (id: string | undefined) => {
            if (id) {
                return gameWidgetsInfo?.[id];
            }
        },
        [gameWidgetsInfo]
    );

    const getGameWidgetInfoFromWidget = useCallback(
        (widgetId: string | undefined) => {
            if (widgetId) {
                return gameWidgetsInfo[widgetId];
            }
        },
        [gameWidgetsInfo]
    );

    const addGameWidget = useCallback(
        (gameWidget: GameWidgetDictionaryItem) => {
            addWidget(gameWidget, buildGameWidgetInfo);
        },
        [addWidget]
    );

    const updateGameWidgetWithMesh = useCallback(
        (widgetId: string, mesh: Object3D | undefined, updateOnlyUI?: boolean) => {
            if (mesh) {
                const widgetProperties = buildWidgetDictionaryProperties(mesh);

                if (updateOnlyUI) {
                    updateSelectedWidgetProperties(widgetProperties);
                } else {
                    updateWidget<GameWidgetValueParameter>(widgetId, {
                        properties: widgetProperties,
                    });
                }
            }
        },
        [updateSelectedWidgetProperties, updateWidget]
    );

    const updateGameWidget = useCallback(
        (widgetId: string, value: GameWidgetValueParameter) => {
            updateWidget(widgetId, value);

            if (value.properties) {
                updateSelectedWidgetProperties(value.properties);
            }
        },
        [updateSelectedWidgetProperties, updateWidget]
    );

    const updateCurrentGameWidgetOptions = useCallback(
        <TValue = string>(widgetOptions: GameWidgetOptionsValues<TValue>) => {
            const currentWidget = selectedGameWidgets[0];

            updateWidget<GameWidgetValueParameter<TValue>>(currentWidget.id, {
                options: widgetOptions,
            });
        },
        [selectedGameWidgets, updateWidget]
    );

    const selectGameWidget = useCallback(
        (widgetsToSelect: GameWidgetDictionaryItem[], forceSelect = false) => {
            if (!forceSelect && widgetsToSelect[0].isFrozen) {
                return;
            }

            const { properties } = gameWidgetsInfo[widgetsToSelect[0].id];
            selectWidget(widgetsToSelect);

            if (properties) {
                updateSelectedWidgetProperties(properties);
                updateGameWidget(widgetsToSelect[0].id, { properties });
            }
        },
        [gameWidgetsInfo, selectWidget, updateSelectedWidgetProperties, updateGameWidget]
    );

    const getGameWidgetByMesh = useCallback(
        (mesh: Object3D) => {
            let widgetMesh: Object3D | undefined;

            if (mesh.name.startsWith(gameWidgetPrefix)) {
                widgetMesh = mesh;
            } else {
                mesh.traverseAncestors((object) => {
                    if (object.name.startsWith(gameWidgetPrefix)) {
                        widgetMesh = object;
                    }
                });
            }

            const widgetIdInMesh = widgetMesh?.name.split("+")[2];
            const widget = getWidgetById(widgetIdInMesh);

            return { widget, widgetMesh };
        },
        [getWidgetById]
    );

    const selectGameWidgetFromMeshArr = useCallback(
        (meshArray: Object3D[]) => {
            if (meshArray.length) {
                const { widget } = getGameWidgetByMesh(meshArray[0]);

                if (widget) {
                    selectWidget([widget]);
                }
            }
        },
        [getGameWidgetByMesh, selectWidget]
    );

    const copyGameWidget = useCallback(
        (widget: GameWidgetDictionaryItem) => {
            const properties = gameWidgetsInfo[widget.id].properties;
            const options = gameWidgetsInfo[widget.id].options;

            const widgetInfo = buildGameWidgetInfo(widget, {
                properties,
                options,
            });

            copyWidget(widget, widgetInfo);
        },
        [copyWidget, gameWidgetsInfo]
    );

    return {
        selectedGameWidgets,
        getGameWidgetById,
        getGameWidgetInfoById,
        addGameWidget,
        gameWidgets,
        gameWidgetsModules,
        gameWidgetsInfo,
        gameWidgetsIds,
        selectGameWidgetFromMeshArr,
        copyGameWidget,
        updateCurrentGameWidgetOptions,
        selectGameWidget,
        updateGameWidgetWithMesh,
        updateGameWidget,
        getGameWidgetInfoFromWidget,
    };
};