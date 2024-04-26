import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export default createTheme({
  palette: {
    text: {
      primary: "#F9F4DA",
    },
    background: {
      default: "#0f0d0e",
    },
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});
