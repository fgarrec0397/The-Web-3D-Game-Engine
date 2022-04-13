import { useEffect, useState } from "react";
import { Object3D } from "three";
import useHandleEditor from "../../Editor/state/hooks/useHandleEditor";
import useSceneObjects from "../../Editor/state/hooks/useSceneObjects";
import useWidgets from "../../Widgets/state/hooks/useWidgets";

export default () => {
    const { objects, copyObject } = useSceneObjects();
    const { removeCurrentWidget } = useWidgets();
    const { removeWidget, currentWidgets } = useWidgets();
    const [copiedObjects, setCopiedObjects] = useState<Object3D[]>([]);

    useHandleEditor();

    useEffect(() => {
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [currentWidgets.length, currentWidgets[0]?.id, copiedObjects, objects]);

    const handleKeyUp = (event: KeyboardEvent): void => {
        // if (event.ctrlKey && event.code === "KeyC") {
        //     if (currentWidgets.length > 0) {
        //         setCopiedObjects(currentObjects);
        //     }
        // } else if (event.ctrlKey && event.code === "KeyV") {
        //     if (copiedObjects.length > 0) {
        //         copiedObjects.forEach((x) => {
        //             copyObject(x);
        //         });
        //     }
        // } else if (event.code === "Delete") {
        //     if (currentObjects.length > 0) {
        //         console.log("delete");
        //         // removeCurrentObjects();
        //         removeCurrentWidget();
        //         // removeWidget();
        //     }
        // }
    };
};
