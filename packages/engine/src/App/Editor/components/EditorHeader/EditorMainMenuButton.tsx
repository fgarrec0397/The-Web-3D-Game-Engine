import useConfig from "@engine/App/Core/_actions/hooks/useConfig";
import { AccountMenu, SettingsIcon } from "@granity/ui";
import { FC } from "react";

const EditorMainMenuButton: FC = () => {
    const { editorMainMenu } = useConfig();

    return (
        <AccountMenu
            title="Editor settings"
            id="editor-menu"
            icon={<SettingsIcon />}
            menuItems={editorMainMenu}
        />
    );
};

export default EditorMainMenuButton;