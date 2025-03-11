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
import Customers from './Components/Pages/Customers/Customers'
import UpdateCategory from './Components/Pages/UpdatePages/UpdateCategory/UpdateCategory'
import CustomerOrders from './Components/Pages/CustomerOrders/CustomerOrders'
import Invoice from './Components/Pages/Invoice/Invoice'
import Coupons from './Components/Pages/Coupons/Coupons'
import UpdateCoupons from './Components/Pages/UpdatePages/UpdateCoupons/UpdateCoupons'

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
            <Route path='/customers' element={<Customers />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/coupons' element={<Coupons />} />
            <Route path='/orders/order/invoice/:id' element={<Invoice />} />
            <Route path='/products/add-product' element={<AddProduct />} />
            <Route path='/products/details/:id' element={<ProductDetails />} />
            <Route path='/products/update/:id' element={<UpdateProduct />} />
            <Route path='/categories/add-category' element={<AddCategory />} />
            <Route path='/categories/details/:id' element={<UpdateProduct />} />
            <Route path='/categories/update/:id' element={<UpdateCategory />} />
            <Route path='/customers/customer/orders/:id' element={<CustomerOrders />} />
            <Route path='/coupons/update/:id' element={<UpdateCoupons />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
