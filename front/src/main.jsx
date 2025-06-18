import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Provider } from 'react-redux'
import { store } from "./redux/store.js";


const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
        <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">   
      <App />
      </ThemeProvider>
        </Provider>
    </StrictMode>,
  );
}
