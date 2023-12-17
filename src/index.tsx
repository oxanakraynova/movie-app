import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Router from "./router";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement!);

root.render(
  <ThemeProvider theme={theme}>
    <Router />
  </ThemeProvider>
);
