import { createTheme, ThemeProvider } from "@mui/material";
import { orange } from "@mui/material/colors";
import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.less";

const theme = createTheme({
  status: {
    danger: orange[500],
  },
});
// fix: ts 'ThemeProvider' cannot be used as a JSX component.
const MyThemeProvider = ThemeProvider as any;
const root = ReactDOM.createRoot(document.getElementById("app")!);

root.render(
  <MyThemeProvider theme={theme}>
    <App></App>
  </MyThemeProvider>
);
