/**
 * App Light Theme
 */
import { createMuiTheme } from '@material-ui/core/styles';
import AppConfig from 'Constants';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: AppConfig.themeColors.secondary
        },
        secondary: {
            main: AppConfig.themeColors.primary
        }
    }
});

export default theme;