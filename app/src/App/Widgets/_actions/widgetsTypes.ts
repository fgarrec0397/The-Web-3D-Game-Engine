import { Dictionary } from "@app/Common/commonTypes";
import { FeaturesWidgetsProps } from "@features/Widgets";
import { Slice } from "@reduxjs/toolkit";
import { FC, ForwardRefExoticComponent, PropsWithoutRef, ReactNode, RefAttributes } from "react";
import { Object3D } from "three";

import { FieldType, HelpersTypes } from "./widgetsConstants";

/// ---------------------- Widget ---------------------- ///

/**
 * Base type of a widget
 */
export type Widget<Props = FeaturesWidgetsProps, Ref = null> = {
    component: WidgetComponent<Props, Ref>;
    reducer: Slice | null;
    widgetDefinition: WidgetDefinition;
};

/**
 * A component type of a widget
 */
export type WidgetComponent<Props, Ref> =
    | FC<Props>
    | ForwardRefExoticComponent<PropsWithoutRef<Props> & RefAttributes<Ref>>;

/**
 * Definition of the widget that is displayed in the editor
 */
export type WidgetDefinition = {
    name: string;
    options?: WidgetOptions[];
};

/**
 * Option for Select FieldType
 */
export type SelectOptions = {
    value: string;
    name: string;
};

type WidgetAdditionnalOptions = WidgetSelectionOptions;

export type WidgetOptionDefaultValue = string | number | boolean; // TODO - Readjust that in order to match the field type

export type WidgetSelectionOptions = {
    selectOptions?: SelectOptions[];
};

/**
 * Base interface for option object.
 */
export type WidgetBaseOptions = WidgetAdditionnalOptions & {
    name: string;
    displayName: string;
    fieldType: FieldType;
    isVisible?: (options: WidgetBaseOptions[]) => boolean;
    defaultValue: WidgetOptionDefaultValue;
};

/**
 * All options allowed for the widget in the editor
 */
export type WidgetOptions = WidgetBaseOptions;

/// ---------------------- Widget Object Module ---------------------- ///

/**
 * A widget object is a widget that can be on the 3D scene.
 */
export type WidgetObjectModule<Props = FeaturesWidgetsProps, Ref = null> = Widget<Props, Ref> & {
    hasRef?: true;
    editorOptions?: WidgetObjectEditorOptions;
};

/**
 * Widget options to set in the editor
 */
export type WidgetObjectEditorOptions = {
    helper?: HelpersTypes;
    meshHolder?: ReactNode | Object3D;
};

/// ---------------------- Widgets Objects Dictionary ---------------------- ///

/**
 * A dictionary containing informations about all WidgetObjectsDictionary
 */
export type WidgetObjectsDictionary<Props = FeaturesWidgetsProps> = Dictionary<
    WidgetObjectsDictionaryItem<Props>
>;

/**
 * Informations of a widget object on the scene
 */
export type WidgetObjectsDictionaryItem<Props = FeaturesWidgetsProps> = Omit<
    WidgetObjectModule<Props>,
    "reducer"
> & {
    id: string;
};

/// ---------------------- Serialized Widgets Objects Dictionary ---------------------- ///

/**
 * A serialized dictionary containing informations about all WidgetObjectsDictionary
 */
export type SerializedWidgetObjectsDictionary<Props = FeaturesWidgetsProps> = Dictionary<
    SerializedWidgetObjectDictionaryItem<Props>
>;

/**
 * A serialized version of WidgetObjectsDictionaryItem type
 */
export type SerializedWidgetObjectDictionaryItem<Props = FeaturesWidgetsProps> = Omit<
    WidgetObjectsDictionaryItem<Props>,
    "component" | "meshHolder"
> & {
    meshHolder: string;
};

/// ---------------------- Widgets Info Dictionary ---------------------- ///

/**
 * A dictionary containing editable informations about a WidgetObjectsDictionaryItem
 */
export type WidgetsInfoDictionary = Dictionary<WidgetsInfoDictionaryItem>;

export type WidgetsInfoDictionaryItem = {
    id: string;
    properties?: WidgetProperties;
    options?: WidgetOptionsValues;
};

export type WidgetOptionsValues = Dictionary<{
    fieldType: FieldType;
    value: WidgetOptionDefaultValue;
}>;

export type WidgetProperties = {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
};

/// ---------------------- Widget UI Module ---------------------- ///

/**
 * Widget module to generate UI elements
 */
export type WidgetUIModule<Props> = Widget<Props>;

/// ---------------------- Widget UI Dictionary ---------------------- ///

/**
 * A dictionary containing informations about all WidgetObjectsDictionary
 */
export type WidgetUIDictionary<Props = FeaturesWidgetsProps> = Dictionary<
    WidgetObjectsDictionaryItem<Props>
>;

/**
 * Informations of a widget object on the scene
 */
export type WidgetUIDictionaryItem<Props = FeaturesWidgetsProps> = Omit<
    WidgetUIModule<Props>,
    "reducer"
> & {
    id: string;
};
