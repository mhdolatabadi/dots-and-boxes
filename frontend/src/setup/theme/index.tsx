import {
  createTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material'
import './scrollbar.css'
import { ReactNode } from 'react'

const theme = createTheme({
  palette: {
    primary: {
      light: '#ffd17a',
      main: '#ffa600',
    },
  },
  typography: { fontFamily: 'Vazir' },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
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

interface Props {
  children: ReactNode
}

export default function ThemeProvider({ children }: Props) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
