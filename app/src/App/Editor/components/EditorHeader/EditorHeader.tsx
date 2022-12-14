import { StyledWrapper } from "@app/Common/components/Html";
import GranityLogo from "@app/Common/components/Html/Icons/GranityLogo";
import { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import { layoutStyles } from "@themes/mixins/layout";
import { pxToRem } from "@themes/utils";
import { FC } from "react";
import { css } from "styled-components";

import EditorPlayButton, { EditorPlayButtonProps } from "./EditorPlayButton";
import EditorPreviewUIButton, { EditorPreviewUIButtonProps } from "./EditorPreviewUIButton";

type EditorStyles = {
    wrapper?: StyledWrapperProps;
    leftSection?: StyledWrapperProps;
    centerSection?: StyledWrapperProps;
    rightSection?: StyledWrapperProps;
    uiPreviewButton?: EditorPreviewUIButtonProps;
    playButton?: EditorPlayButtonProps;
};

const styles: EditorStyles = {
    wrapper: {
        css: css`
            ${layoutStyles(0, 0, undefined, 0)}
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: ${pxToRem(10, 30)};
            backdrop-filter: blur(50px);
        `,
    },
    centerSection: {
        css: css`
            display: flex;
            align-items: center;
        `,
    },
    leftSection: {
        css: css`
            display: flex;
            align-items: center;
        `,
    },
    playButton: {
        styles: {
            button: {
                css: css`
                    margin-left: ${pxToRem(25)};
                `,
            },
        },
    },
};

const EditorHeader: FC = () => {
    return (
        <StyledWrapper {...styles.wrapper}>
            <StyledWrapper {...styles.leftSection}>
                <GranityLogo />
            </StyledWrapper>
            <StyledWrapper {...styles.centerSection}>
                <EditorPreviewUIButton {...styles.uiPreviewButton} />
                <EditorPlayButton {...styles.playButton} />
            </StyledWrapper>
            <StyledWrapper {...styles.rightSection}>Menu</StyledWrapper>
        </StyledWrapper>
    );
};

export default EditorHeader;
