import { CssBaseline } from '@material-ui/core'
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core'
import palette from './palette'
import './scrollbar.css'

const theme = createMuiTheme({
  palette: palette,
  // TODO: Update FONT with you loaded font-name
  typography: { fontFamily: 'FONT, sans-serif' },
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
