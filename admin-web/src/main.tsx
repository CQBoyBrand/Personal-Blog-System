import { StrictMode, Suspense  } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/main.scss'
import { BrowserRouter } from 'react-router-dom'
import LoadingPage from "@/components/LoadingPage/Loading";
// 国际化i18n
import '@/locales/config';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
