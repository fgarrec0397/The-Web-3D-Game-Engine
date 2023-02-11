import { pxToRem } from "@granity-ui/Theme";
import { inputStyles } from "@granity-ui/Theme/mixins/form";
import { css, styled } from "@mui/material";
import InputLabelLib, { InputLabelProps as LibInputLabelProps } from "@mui/material/InputLabel";
import TextFieldLib, { TextFieldProps as LibTextFieldProps } from "@mui/material/TextField";
import { FC } from "react";

export type TextFieldProps = LibTextFieldProps & {
    labelPosition?: "top" | "left";
};
export type InputLabelProps = LibInputLabelProps;

const StyledTextField = styled(TextFieldLib)<TextFieldProps>`
    ${inputStyles()}

    ${({ labelPosition }) => {
        if (labelPosition === "left") {
            return css`
                flex-direction: row;
                align-items: center;

                .MuiFormLabel-root {
                    margin-right: ${pxToRem(2)};
                    overflow: visible;
                }
            `;
        }
    }}
`;

const TextField: FC<TextFieldProps> = ({ children, ...props }) => {
    return <StyledTextField {...props}>{children}</StyledTextField>;
};

export const InputLabel: FC<InputLabelProps> = ({ children, ...props }) => {
    return <InputLabelLib {...props}>{children}</InputLabelLib>;
};

export default TextField;
