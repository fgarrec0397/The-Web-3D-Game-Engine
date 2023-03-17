import { useCallback } from "react";

import { ScenesDictionary, ScenesDictionaryItem } from "../../scenesTypes";
import useScenesDispatch from "./useScenesDispatch";
import useScenesSelector from "./useScenesSelector";

export default () => {
    const {
        dispatchAddScene,
        dispatchSetIsLoading,
        dispatchAddScenesBatch,
        dispatchResetScenes,
        dispatchSetCurrentSceneId,
        dispatchSetCurrentDefaultSceneId,
        dispatchUpdateScene,
        dispatchRemoveScene,
    } = useScenesDispatch();
    const { scenes, scenesIds, currentSceneId, currentDefaultSceneId, scenesLoading } =
        useScenesSelector();

    const add = (scene: ScenesDictionaryItem) => {
        dispatchAddScene(scene);
    };

    const setIsLoading = (isLoading: boolean) => {
        dispatchSetIsLoading(isLoading);
    };

    const addBatch = (newScenes: ScenesDictionary) => {
        dispatchAddScenesBatch(newScenes);
    };

    const reset = useCallback(
        (newScenes: ScenesDictionary, newCurrentSceneId: string) => {
            dispatchResetScenes(newScenes, newCurrentSceneId);
        },
        [dispatchResetScenes]
    );

    const updateCurrentSceneId = (sceneId: string) => {
        dispatchSetCurrentSceneId(sceneId);
    };

    const updateCurrentDefaultSceneId = (sceneId: string) => {
        dispatchSetCurrentDefaultSceneId(sceneId);
    };

    const updateScene = useCallback(
        (scene: ScenesDictionaryItem) => {
            dispatchUpdateScene(scene);
        },
        [dispatchUpdateScene]
    );

    const remove = (sceneId: string) => {
        dispatchRemoveScene(sceneId);
    };

    return {
        scenes,
        scenesIds,
        scenesLoading,
        currentSceneId,
        currentDefaultSceneId,
        add,
        setIsLoading,
        addBatch,
        reset,
        updateScene,
        updateCurrentDefaultSceneId,
        updateCurrentSceneId,
        remove,
    };
};