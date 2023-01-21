import { HasChildren } from "@granity/helpers";
import { FormLabel, FormLabelProps } from "ariakit";
import styled, { css } from "styled-components";

import { labelStyles } from "../../../Themes/mixins/form";
import { ThemedFlattenInterpolation } from "../../../Themes/types";
import { pxToRem } from "../../../Themes/utils";

export type LabelStylesProps = {
    additionalCss?: ThemedFlattenInterpolation;
};

export type LabelComponentProps = FormLabelProps & {
    labelPosition?: "left" | "top";
};

export type LabelProps = LabelStylesProps & LabelComponentProps;

type Props = LabelProps & HasChildren;

const Label = styled(({ labelPosition, additionalCss, ...props }) => (
    <FormLabel {...props} />
))<Props>`
    ${labelStyles()}

    ${({ labelPosition }) => css`
        ${labelPosition === "left" &&
        css`
            margin-right: ${pxToRem(8)};
            margin-bottom: 0;
        `}
    `}

    ${({ additionalCss }) => additionalCss}
`;

export default Label;
