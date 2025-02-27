import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Main from './Components/Pages/Main/Main'
import DashboardHome from './Components/Pages/DashboardHome/DashboardHome'
import Products from './Components/Pages/Products/Products'
import Orders from './Components/Pages/Orders/Orders'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path='/' element={<DashboardHome />} />
            <Route path='/products' element={<Products />} />
            <Route path='/orders' element={<Orders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
