import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { lightTheme } from '../themes'
import { SWRConfig} from 'swr'
import { UiProvider } from '../context/ui'
import { CartProvider } from '../context/cart'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig 
    value={{
      //refreshInterval: 3000,
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    }}
  >
    <CartProvider>
      <UiProvider isMenuOpen={false}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>    
    </CartProvider>
  </SWRConfig>      
  )
}

export default MyApp
