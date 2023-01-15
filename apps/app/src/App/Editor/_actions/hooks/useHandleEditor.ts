import { useEffect } from "react";
import { Toaster } from "ui-granity";

import useEditor from "./useEditor";

export default () => {
    const { isEditor } = useEditor();

    useEffect(() => {
        if (isEditor) {
            document.exitPointerLock();
            Toaster.toast.info("Edit mode");
        } else {
            Toaster.toast.info("Game mode");
        }
    }, [isEditor]);
};
