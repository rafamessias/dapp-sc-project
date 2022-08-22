// ** MUI Imports
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

// ** Theme Config
import themeConfig from "./themeConfig";

// ** Theme Override Imports
import overrides from "./overrides";
import typography from "./typography";

// ** Theme
import themeOptions from "./ThemeOptions";

// ** Global Styles
import GlobalStyling from "./globalStyles";

const ThemeProviderWrapper = (props) => {
  // ** Props
  const { children } = props;

  const settings = {
    themeColor: "primary",
    mode: themeConfig.mode,
    contentWidth: themeConfig.contentWidth,
    redirectToPlanPro: false,
  };

  // ** Merged ThemeOptions of Core and User
  const coreThemeConfig = themeOptions(settings);

  // ** Pass ThemeOptions to CreateTheme Function to create partial theme without component overrides
  let theme = createTheme(coreThemeConfig);

  // ** Continue theme creation and pass merged component overrides to CreateTheme function
  theme = createTheme(theme, {
    components: { ...overrides(theme) },
    typography: { ...typography(theme) },
  });

  // ** Set responsive font sizes to true
  if (themeConfig.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={() => GlobalStyling(theme)} />
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
