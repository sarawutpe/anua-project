import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import Order from './pages/Admin/Order'
import Product from './pages/Admin/Product'
import ProductAdd from './pages/Admin/ProductAdd'
import ProductEdit from './pages/Admin/ProductEdit'
import App from './pages/App/App'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <p>404 Not Found!</p>,
    children: [
      {
        path: '',
        element: <App />,
      },
      {
        path: 'admin',
        children: [
          {
            path: '',
            element: <Product />,
          },
          {
            path: 'product-add',
            element: <ProductAdd />,
          },
          {
            path: 'product-edit/:productId',
            element: <ProductEdit />,
          },
          {
            path: 'order',
            element: <Order />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <App />,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
