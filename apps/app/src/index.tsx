import Core from "@app/Core/Core";
import GlobalStyle from "@themes/globalStyle";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Providers from "./Providers";

const container = document.getElementById("root") as Element | DocumentFragment;

const root = createRoot(container);
console.log("test");

root.render(
    <StrictMode>
        <Providers>
            <GlobalStyle />
            <Core />
        </Providers>
    </StrictMode>
);