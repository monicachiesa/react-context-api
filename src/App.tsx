import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyled } from './styles/global'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
import { useState } from 'react'

export function App() {
  
  
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyled />{' '}
        {/* Pode ser passado em qualquer lugar dentro do theme provider aqui /*/}
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  )
}
