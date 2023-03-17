import { useCallback } from "react";

import { ModesAvailable } from "../../editorTypes";
import useEditorDispatch from "./useEditorDispatch";
import useEditorSelector from "./useEditorSelector";

export default () => {
    const {
        dispatchSetIsEditor,
        dispatchSetIsEditing,
        dispatchSetHasEditorOpened,
        dispatchSetIsGameUIPreview,
        dispatchSetHasEdited,
        dispatchSetIsMultipleSelect,
        dispatchSetIsGridEnabled,
        dispatchSetCurrentMode,
    } = useEditorDispatch();
    const {
        isEditor,
        hasEdited,
        hasEditorOpened,
        isGameUIPreview,
        isEditing,
        currentMode,
        isGridEnabled,
    } = useEditorSelector();

    const updateIsEditor = (value: boolean) => {
        dispatchSetIsEditor(value);
    };

    const updateIsEditing = (value: boolean) => {
        dispatchSetIsEditing(value);
    };

    const updateHasEditorOpened = () => {
        dispatchSetHasEditorOpened();
    };

    const updatedIsGameUIPreview = (value: boolean) => {
        dispatchSetIsGameUIPreview(value);
    };

    const updatedIsGridEnabled = (value: boolean) => {
        dispatchSetIsGridEnabled(value);
    };

    const updateHasEdited = useCallback(
        (value: boolean) => {
            dispatchSetHasEdited(value);
        },
        [dispatchSetHasEdited]
    );

    const updateIsMultipleSelect = (value: boolean) => {
        dispatchSetIsMultipleSelect(value);
    };

    const updateCurrentMode = (value: ModesAvailable) => {
        dispatchSetCurrentMode(value);
    };

    return {
        isEditor,
        hasEdited,
        hasEditorOpened,
        isEditing,
        isGameUIPreview,
        currentMode,
        isGridEnabled,
        updateIsEditor,
        updateIsEditing,
        updatedIsGameUIPreview,
        updateHasEditorOpened,
        updateHasEdited,
        updatedIsGridEnabled,
        updateIsMultipleSelect,
        updateCurrentMode,
    };
};