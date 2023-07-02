import { RecursiveArrayOfIds } from "@granity/helpers";
import { SxProps } from "@granity/ui";

// Draggable

export type DragItemRaw = {
    parentId: string;
    id: string;
    index: number;
    path: string;
    title: string;
    type: string;
    children?: RecursiveArrayOfIds<string>;
};

export type MarginType = { left: number; right: number; top: number; bottom: number };

export type DragItem = DragItemRaw & {
    margin: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    __rect__?: DOMRect;
};

export type DraggableSnapshot = {
    isDragging: boolean;
    isOver: boolean;
};

export type DragCollectProps = {
    isDragging: boolean;
    draggedItem: DragItem;
    style?: SxProps;
};

// Provider

export type DropResultItem = {
    index?: number;
    path: string;
    id: string;
    parentId?: string;
};

export type DropResult = {
    source: DropResultItem;
    destination?: DropResultItem;
    dropType: "draggable" | "droppable" | "move" | "combine";
    sameSource: boolean;
};

export type OnDrop = (dropResult: DropResult) => void;

export type OnMoveItemResult = Omit<DragItemRaw, "type" | "title">;

export type OnMove = (sourceItem: OnMoveItemResult, destinationItem: OnMoveItemResult) => void;