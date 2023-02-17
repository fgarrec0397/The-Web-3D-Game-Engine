import useWidgetStarter2Dispatch from "./useWidgetStarter2Dispatch";
import useWidgetStarter2Selector from "./useWidgetStarter2Selector";

export default () => {
    const { dispatchAdd } = useWidgetStarter2Dispatch();
    const { widgetStarter2Message } = useWidgetStarter2Selector();

    const add = (message: string) => {
        dispatchAdd(message);
    };

    return { add, widgetStarter2Message };
};
