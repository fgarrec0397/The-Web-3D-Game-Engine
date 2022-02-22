// @ts-ignore
import * as THREE from "three";
// @ts-ignore
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { useThree } from "@react-three/fiber";
import React, { FC, useEffect, useState } from "react";
import useCurrentElement from "../_Editor/state/hooks/useCurrentElement";
import useCurrentMode from "../_Editor/state/hooks/useCurrentMode";
import useIsEditing from "../_Editor/state/hooks/useIsEditing";
import useElementsOnScene from "../_Editor/state/hooks/useElementsOnScene";

const TransformControlsComponent: FC = ({ children }) => {
    const { currentElement, currentElements, updateCurrentElement, setCurrentElement } =
        useCurrentElement();
    const { elementsOnScene } = useElementsOnScene();
    const { currentMode } = useCurrentMode();
    const { setIsEditing } = useIsEditing();
    const { mouse, camera, raycaster, scene, gl } = useThree();
    const [transformControl, setTransformControl] = useState<TransformControls>();
    const [stateMesh, setStateMesh] = useState<THREE.Mesh>();
    const [temporaryGroup, setTemporaryGroup] = useState<THREE.Group>();

    useEffect(() => {
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [elementsOnScene, currentElements.length, temporaryGroup]);

    useEffect(() => {
        let mesh = scene.children.find((x: any) => x.uuid === currentElement?.meshuuid);

        if (currentElements.length > 1) {
            const group = new THREE.Group();
            const meshesToGroup = scene.children.filter((x: any) => {
                return currentElements.some((y) => x.uuid === y.meshuuid);
            });

            meshesToGroup.forEach((x: any) => {
                group.add(x);
            });

            setTemporaryGroup(group);

            scene.add(group);
            mesh = group;
            transformControl.attach(mesh);
        }

        setStateMesh(mesh);
    }, [currentElement?.meshId, currentElements.length]);

    /**
     * Instantiate TransformControls class, attach a mesh and add it to the scene
     */

    useEffect(() => {
        if (!transformControl && stateMesh) {
            const transformC = new TransformControls(camera, gl.domElement);
            transformC.attach(stateMesh);
            transformC.setMode(currentMode);

            scene.add(transformC);
            setTransformControl(transformC);
        }

        return () => {
            if (transformControl) {
                scene.remove(transformControl);
                setTransformControl(undefined);
            }
        };
    }, [transformControl, camera, scene, gl, stateMesh]);

    /**
     * Initialize events on transformControls.
     * Updated each time elementsOnScene is modified to keep the state updated
     */

    useEffect(() => {
        transformControl?.addEventListener("dragging-changed", onDraggingChangedHandler);
        transformControl?.addEventListener("objectChange", onObjectChangeHandler);

        return () => {
            transformControl?.removeEventListener("dragging-changed", onDraggingChangedHandler);
            transformControl?.removeEventListener("objectChange", onObjectChangeHandler);
        };
    }, [transformControl, currentElement?.meshId, elementsOnScene]);

    /**
     * Detach the transformControl whenever the current element change
     */

    useEffect(() => {
        if (transformControl) {
            transformControl.detach();
        }
    }, [currentElement?.id, temporaryGroup]);

    /**
     * Update the transformControl mode when the currentMode changes
     */

    useEffect(() => {
        if (transformControl) {
            transformControl.setMode(currentMode);
        }
    }, [currentMode]);

    /**
     * Raycast the closest element and select it as the current element
     * @param event
     */

    const onMouseUp = (event: MouseEvent): void => {
        event.preventDefault();

        const isMultipleSelect = event.ctrlKey;

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects([...scene.children]);

        if (intersects.length > 0) {
            const [closestMesh] = intersects.sort((x: any) => x.distance);
            setCurrentElement(closestMesh.object.uuid, isMultipleSelect);
        } else if (temporaryGroup) {
            console.log(transformControl.object, "transformControl.object");

            // TODO - Probleme here

            // transformControl.detach();
            const grouppedMeshes: any = [];

            temporaryGroup.children.forEach((child: any) => {
                if (child) {
                    grouppedMeshes.push(child);
                    scene.remove(child);
                }
            });

            grouppedMeshes.forEach((mesh: any) => {
                scene.add(mesh);
            });

            // TODO -- Maybe check to move this code
            setTemporaryGroup(undefined);
            scene.remove(temporaryGroup);
        }
    };

    /**
     * Change isEditing value based on the dragging-changed event
     * @param event
     */

    const onDraggingChangedHandler = ({ value }: any) => {
        setIsEditing(value);
    };

    /**
     * Update the currentElement based on the mesh properties
     */

    const onObjectChangeHandler = () => {
        const mesh = scene.children.find((x: any) => x.uuid === currentElement?.meshuuid);

        if (mesh) {
            updateCurrentElement({
                position: mesh.position,
                rotation: mesh.rotation,
                scale: mesh.scale,
            });
        }
    };

    useEffect(() => {
        console.log(scene.children, "scene");
    }, [scene.children.length]);

    return <>{children}</>;
};

export default TransformControlsComponent;
