import { createTheme, CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material'
import './scrollbar.css'

const theme = createTheme({
  palette: {
    primary: {
      light: '#ffd17a',
      main: '#ffa600',
    },
  },
  typography: { fontFamily: 'Vazir' },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
          height: '100%',
          willChange: 'transform',
          WebkitOverflowScrolling: 'touch',
          scrollbarColor: 'rgba(0, 0, 0, 0.2)',
          scrollbarWidth: 'thin',
        },
        body: {
          margin: 0,
          height: '100%',
          overflow: 'hidden',
          userSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
        },
        '.root': { height: '100%' },
      },
    },
  },
})

export default function ThemeProvider({ children }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
