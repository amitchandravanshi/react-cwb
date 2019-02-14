import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#17a2b8",
      text: "#d3d3d3",
      light: "#a6eef9",
      pink: pink
    },
    secondary: pink,
    error: red
  },
  status: {
    danger: "orange"
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ["AvenirNextLT-Regular","AvenirNextLT-Demi"].join(","),
    subheading: {
      fontSize: 16,
      fontWeight: 100,
      fontStyle: "bold"
    },
    button: {
      fontStyle: "bold"
    }
  }
});

export default theme;
