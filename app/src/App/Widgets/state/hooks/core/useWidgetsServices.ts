import {
    WidgetOptionsValues,
    WidgetProperties,
    WidgetSceneObject,
    WidgetsDictionary,
} from "../../../types";
import useWidgetDispatch from "./useWidgetDispatch";
import useSceneWidgetsContext from "./useSceneWidgetsContext";

export default () => {
    const { widgets, setSceneWidgets } = useSceneWidgetsContext();
    const {
        dispatchAddDictionary,
        dispatchAddBatchDictionary,
        dispatchUpdateDictionary,
        dispatchRemoveSelected,
        dispatchSetCurrentWidgetProperties,
        dispatchRemoveWidgetDictionary,
    } = useWidgetDispatch();

    const add = (
        newWidget: WidgetSceneObject,
        properties: WidgetProperties,
        options: WidgetOptionsValues
    ) => {
        if (newWidget.id) {
            dispatchAddDictionary({
                id: newWidget.id,
                properties,
                options,
            });
        }

        setSceneWidgets([...widgets, newWidget]);
    };

    const addBatch = (newWidgetsDictionary: WidgetsDictionary, newWidgets: WidgetSceneObject[]) => {
        dispatchAddBatchDictionary(newWidgetsDictionary);
        setSceneWidgets([...widgets, ...newWidgets]);
    };

    const update = (
        widget: WidgetSceneObject,
        widgetProperties?: WidgetProperties,
        widgetOptions?: WidgetOptionsValues
    ) => {
        if (widget.id) {
            dispatchUpdateDictionary({
                id: widget.id,
                options: widgetOptions,
                properties: widgetProperties,
            });
        }
    };

    const remove = (widget: WidgetSceneObject) => {
        const updatedWidgets = widgets.filter(({ id }) => id !== widget.id);
        setSceneWidgets([...updatedWidgets]);
        dispatchRemoveWidgetDictionary(widget.id);
        dispatchRemoveSelected();
    };

    const updateCurrentProperties = (widgetProperties: WidgetProperties) => {
        dispatchSetCurrentWidgetProperties(widgetProperties);
    };

    // - Remove

    return {
        add,
        addBatch,
        update,
        remove,
        updateCurrentProperties,
    };
};
