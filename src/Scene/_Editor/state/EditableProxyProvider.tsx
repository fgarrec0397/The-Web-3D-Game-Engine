import React, { FC, createContext, useState, Dispatch, SetStateAction } from "react";
import { Object3D } from "three";

export interface IEditableProxy {
    name: string;
    type: string;
    // object: Object3D;
}

export interface EditableProxyContextModel {
    editableProxies: IEditableProxy[] | [];
    setEditableProxies: (() => void) | Dispatch<SetStateAction<IEditableProxy[]>>;
}

export const defaultContext: EditableProxyContextModel = {
    editableProxies: [],
    setEditableProxies: () => {},
};

export const EditableProxyContext = createContext<EditableProxyContextModel>(defaultContext);

const EditableProxyProvider: FC = ({ children }) => {
    const [editableProxies, setEditableProxies] = useState<IEditableProxy[]>([]);

    const providerValue: EditableProxyContextModel = {
        editableProxies,
        setEditableProxies,
    };

    return (
        <EditableProxyContext.Provider value={providerValue}>
            {children}
        </EditableProxyContext.Provider>
    );
};

export default EditableProxyProvider;