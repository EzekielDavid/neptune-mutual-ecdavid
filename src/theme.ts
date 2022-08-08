import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    height: '100%'
                },
                __next: {
                    height: '100%'
                },
                body: {
                    height: '100%',
                    color: 'black',
                    backgroundColor: 'grey',
                    '& h1': {
                        color: 'black'
                    }
                }
            }
        }
    }
});

export default theme;