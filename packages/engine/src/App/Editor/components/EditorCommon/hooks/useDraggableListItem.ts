import { EditorListDragItem } from "@engine/App/Editor/_actions/editorTypes";
import { isChildItem } from "@engine/App/Editor/_actions/utilities/dnd";
import {
    DragSourceMonitor,
    getEmptyImage,
    Identifier,
    useDrag,
    useDrop,
    XYCoord,
} from "@granity/draggable";
import { RecursiveArrayOfIds } from "@granity/helpers";
import { useEffect, useRef, useState } from "react";

import { ItemTypes } from "../../EditorRightPanel/EditorItemsListItem";

export type DraggableListItem = {
    dragItem: EditorListDragItem;
    isDraggable?: boolean;
    itemsDictionaryIds: RecursiveArrayOfIds<string>;
    moveItem?: (itemDrag: EditorListDragItem, itemDrop: EditorListDragItem) => void;
    dropItem?: (
        isNesting: boolean,
        itemDrag: EditorListDragItem,
        itemDrop: EditorListDragItem
    ) => void;
};

export default ({
    dragItem,
    moveItem,
    itemsDictionaryIds,
    dropItem,
    isDraggable = true,
}: DraggableListItem) => {
    const ref = useRef<HTMLLIElement>(null);
    const [isNesting, setIsNesting] = useState(false);
    const [hasDropWhenNesting, setHasDropWhenNesting] = useState(false);
    const [itemHoveredId, setItemHoveredId] = useState<string>();
    const [draggingItemId, setDraggingItemId] = useState<string>();

    if (!isDraggable) {
        return;
    }

    const [{ handlerId }, drop] = useDrop<
        EditorListDragItem,
        void,
        { handlerId: Identifier | null }
    >(
        {
            accept: ItemTypes.LIST_ITEM,
            collect(monitor) {
                return {
                    handlerId: monitor.getHandlerId(),
                };
            },
            drop(item) {
                dropItem?.(isNesting, item, dragItem);
                setIsNesting(false);
            },
            hover(item: EditorListDragItem, monitor) {
                const dragIndex = item.index;
                const hoverIndex = dragItem.index;
                const isChild = isChildItem(dragItem);

                if (!ref.current) {
                    setIsNesting(false);

                    return;
                }

                if (!moveItem) {
                    return;
                }

                // Don't replace items with themselves
                if (dragIndex === hoverIndex) {
                    setIsNesting(false);

                    return;
                }

                const hoverItemBoundingRect = ref.current?.getBoundingClientRect();
                const hoverItemHeight = hoverItemBoundingRect.bottom - hoverItemBoundingRect.top;
                const draggingPercentage = 0.5;
                const hoverItemHeightPercentage = hoverItemHeight * draggingPercentage;
                const draggingDownwardTriggerPosition = hoverItemHeightPercentage;
                const draggingUpwardTriggerPosition = hoverItemHeight - hoverItemHeightPercentage;

                // Determine mouse position
                const clientOffset = monitor.getClientOffset();

                // Get pixels to the top
                const hoverClientY = (clientOffset as XYCoord).y - hoverItemBoundingRect.top;

                // Dragging downwards
                if (dragIndex < hoverIndex && hoverClientY < draggingDownwardTriggerPosition) {
                    if (hoverClientY < 5) {
                        setIsNesting(false);

                        return;
                    }

                    if (!isNesting) {
                        setIsNesting(true);

                        return;
                    }

                    return;
                }

                // Dragging upwards
                if (dragIndex > hoverIndex && hoverClientY > draggingUpwardTriggerPosition) {
                    if (hoverClientY > hoverItemHeight - 5) {
                        setIsNesting(false);

                        return;
                    }

                    if (!isNesting) {
                        setIsNesting(true);

                        return;
                    }

                    return;
                }

                // if (isChild) {
                //     console.log(dragItem, "dragItem child");
                // }

                // Time to actually perform the action
                moveItem(item, dragItem);

                item.index = hoverIndex;
                item.path = hoverIndex.toString();
            },
        },
        [itemsDictionaryIds, isNesting]
    );

    const [{ isDragging }, drag, preview] = useDrag(
        {
            type: ItemTypes.LIST_ITEM,
            item: () => {
                return {
                    id: dragItem.id,
                    index: dragItem.index,
                    path: dragItem.path,
                    title: dragItem.title,
                    children: dragItem.children,
                };
            },
            collect: (monitor: DragSourceMonitor) => ({
                isDragging: monitor.isDragging(),
            }),
            isDragging: (monitor) => {
                return dragItem.id === monitor.getItem().id;
            },
        },
        [itemsDictionaryIds]
    );

    drag(drop(ref));

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    return {
        ref,
        handlerId,
        isDragging,
        isNesting,
        hasDropWhenNesting,
        itemHoveredId,
        draggingItemId,
    };
};
