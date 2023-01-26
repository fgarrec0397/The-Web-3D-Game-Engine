import { css } from "styled-components";

import { getColor, getCommon, pxToRem } from "../utils";

export const boxStyles = () => {
    return css`
        padding: ${pxToRem(20, 15)};
        width: 100%;
        border-radius: ${getCommon("borderRadius.panel")};
        background-color: ${getColor("common.backgroundDark")};
        box-shadow: ${getCommon("boxShadow.main")};
    `;
};