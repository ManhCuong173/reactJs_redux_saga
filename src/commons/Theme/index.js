import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  color: {
    primary: '#3F51B5',
    secondary: '#757575',
    error: '#FF5252',
    white: '#FFFF',
    black: '#1a1a1a',
  },
  typography: {
    fontFamily: 'Roboto',
  },
  shape: {
    borderRadius: 4,
    backgroundColor: '#3F51B5',
    textColor: '#FFFF',
  },
  spacing: 8,
});

export default theme;
