import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import materialTheme from "../material-theme";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <ThemeProvider theme={materialTheme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
