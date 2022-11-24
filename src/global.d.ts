import { ThemeOptions, Theme } from "@mui/material";
// for debug vditor
export * from "vditor/types/index";
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
