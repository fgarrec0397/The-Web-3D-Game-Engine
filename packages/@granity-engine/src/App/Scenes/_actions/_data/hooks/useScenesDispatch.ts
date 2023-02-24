import { useDispatch } from "react-redux";

import { ScenesDictionary, ScenesDictionaryItem } from "../../scenesTypes";
import {
    addScene,
    addScenesBatch,
    removeScene,
    resetScenes,
    setCurrentDefaultSceneId,
    setCurrentSceneId,
    setScenesLoading,
    updateScene,
} from "../state/scenesReducer";

export default () => {
    const dispatch = useDispatch();

    const dispatchAddScene = (scene: ScenesDictionaryItem) => {
        dispatch(addScene(scene));
    };

    const dispatchSetIsLoading = (isLoading: boolean) => {
        dispatch(setScenesLoading(isLoading));
    };

    const dispatchAddScenesBatch = (scenes: ScenesDictionary) => {
        dispatch(addScenesBatch(scenes));
    };

    const dispatchResetScenes = (scenes: ScenesDictionary, newCurrentSceneId: string) => {
        dispatch(resetScenes({ scenes, currentSceneId: newCurrentSceneId }));
    };

    const dispatchSetCurrentSceneId = (sceneId: string) => {
        dispatch(setCurrentSceneId(sceneId));
    };

    const dispatchSetCurrentDefaultSceneId = (sceneId: string) => {
        dispatch(setCurrentDefaultSceneId(sceneId));
    };

    const dispatchUpdateScene = (scene: ScenesDictionaryItem) => {
        dispatch(updateScene(scene));
    };

    const dispatchRemoveScene = (sceneId: string) => {
        dispatch(removeScene(sceneId));
    };

    return {
        dispatchAddScene,
        dispatchSetIsLoading,
        dispatchAddScenesBatch,
        dispatchResetScenes,
        dispatchUpdateScene,
        dispatchSetCurrentSceneId,
        dispatchSetCurrentDefaultSceneId,
        dispatchRemoveScene,
    };
};
