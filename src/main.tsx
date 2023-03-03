import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './App'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true,
      
    },

  },
});



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <React.Suspense fallback={<h1>Loading ...</h1>}> */}
        <App />
      {/* </React.Suspense> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,
  </React.StrictMode>,
)
