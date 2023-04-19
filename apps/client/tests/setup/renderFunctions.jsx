import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';

const generateQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        }, 
        logger: {
            log: console.log,
            warn: console.warn,
            error: () => {},
        }    
    })
}

export const renderWithQueryClient = (ui) => {
    const queryClient = generateQueryClient()
    return render(
        <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    )
}

export const renderWithQueryClientBrowserRouter = (ui) => {
    const queryClient = generateQueryClient()
    return render(
        <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            {ui}
        </BrowserRouter>
        </QueryClientProvider>
    )
}

export const renderWithQueryClientMemoryRouter = (ui, route, path) => {
    const queryClient = generateQueryClient()
        
    return render(
        <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>
            <Routes>
                <Route path={path} element={ui} />
            </Routes>            
        </MemoryRouter>
        </QueryClientProvider>
    )
}

export const createWrapper = () => {
    const queryClient = generateQueryClient()
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
            {children}
            </BrowserRouter>
        </QueryClientProvider>
      )
}