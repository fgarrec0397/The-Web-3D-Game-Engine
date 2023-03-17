import { Preview } from "@engine/Theme/components/Icons";
import { IconButton, IconButtonProps, pxToRem } from "@granity/ui";
import { FC } from "react";

export type EditorPreviewButtonStyles = {
    button?: IconButtonProps;
};

const styles: EditorPreviewButtonStyles = {
    button: {
        sx: {
            padding: pxToRem(4),
            color: "secondary.dark",
        },
    },
};

const EditorPreviewButton: FC = () => {
    const onClickPreviewUIHandler = () => {
        console.log("preview");
    };

    return (
        <IconButton onClick={onClickPreviewUIHandler} {...styles.button}>
            <Preview />
        </IconButton>
    );
};

export default EditorPreviewButton;