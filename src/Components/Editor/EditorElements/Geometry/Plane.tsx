// @ts-ignore
import * as THREE from "three";
import { usePlane } from "@react-three/cannon";
import React, { FC, useRef } from "react";
import { GeometryPlaneProps } from "../types";
import EditableMesh from "../../EditableMesh";
import useEditorContext from "../../../../hooks/Editor/useEditorContext";

const Plane: FC<GeometryPlaneProps> = ({ component }) => {
  const name = "plane1";
  const { isEditor } = useEditorContext();
  const ref = useRef<THREE.Mesh>();
  const [physicRef] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <EditableMesh
      geometryRef={isEditor ? ref : physicRef}
      rotation={[-Math.PI / 2, 0, 0]}
      name={name}
      component={component}
    >
      <planeGeometry attach="geometry" args={[10, 10]} />
    </EditableMesh>
  );
};

export default Plane;
