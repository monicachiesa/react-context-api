import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyled } from './styles/global'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
import { CyclesContextProvider } from './contexts/CyclesContext'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyled />{' '}
        <CyclesContextProvider>
          {/* Pode ser passado em qualquer lugar dentro do theme provider aqui / */}
          <Router />
        </CyclesContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
