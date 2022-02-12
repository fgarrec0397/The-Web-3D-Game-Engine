// @ts-ignore
import THREE from "three";
import { SceneElementInformations } from "../context/EditorContextProvider";

export default (mesh: THREE.Mesh, component = ""): SceneElementInformations => {
  return {
    id: mesh?.uuid,
    name: mesh?.geometry.type,
    component,
    mesh,
  };
};
