import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import materialTheme from "../material-theme";
import React from "react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider theme={materialTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
