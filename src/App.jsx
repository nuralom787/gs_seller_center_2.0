import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Main from './Components/Pages/Main/Main'
import DashboardHome from './Components/Pages/DashboardHome/DashboardHome'
import Products from './Components/Pages/Products/Products'
import Orders from './Components/Pages/Orders/Orders'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import UpdateProduct from './Components/Pages/UpdatePages/UpdateProduct/UpdateProduct'
import { ToastContainer } from 'react-toastify'
import ProductDetails from './Components/Pages/DetailsPages/ProductDetails/ProductDetails'
import AddProduct from './Components/Pages/AddPages/AddProduct/AddProduct'
import Categories from './Components/Pages/Categories/Categories'
import AddCategory from './Components/Pages/AddPages/AddCategory/AddCategory'

function App() {
  const queryClient = new QueryClient();


  // Monitor Dark Mode.
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }, []);


  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path='/' element={<DashboardHome />} />
            <Route path='/products' element={<Products />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/products/add-product' element={<AddProduct />} />
            <Route path='/products/details/:id' element={<ProductDetails />} />
            <Route path='/products/update/:id' element={<UpdateProduct />} />
            <Route path='/categories/add-category' element={<AddCategory />} />
            <Route path='/categories/details/:id' element={<UpdateProduct />} />
            <Route path='/categories/update/:id' element={<UpdateProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
