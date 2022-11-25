import { uidGenerator } from "@app/Common/utilities";
import { WidgetType } from "@app/Widgets/_actions/widgetsConstants";
import { WidgetDictionary } from "@app/Widgets/_actions/widgetsTypes";

import TestWidgetComponent from "./TestWidgetComponent";

export const widgetTestId1 = uidGenerator();
export const widgetTestId2 = uidGenerator();
export const widgetTestId3 = uidGenerator();

export const widgetsDictionaryTest: WidgetDictionary = {
    [widgetTestId1]: {
        component: TestWidgetComponent,
        id: widgetTestId1,
        hasRef: true,
        type: WidgetType.GameObject,
        widgetDefinition: {
            name: "widget1",
        },
    },
    [widgetTestId2]: {
        component: TestWidgetComponent,
        id: widgetTestId2,
        hasRef: true,
        type: WidgetType.GameObject,
        widgetDefinition: {
            name: "widget2",
        },
    },
    [widgetTestId3]: {
        component: TestWidgetComponent,
        id: widgetTestId3,
        type: WidgetType.UI,
        widgetDefinition: {
            name: "widget3",
        },
    },
};
