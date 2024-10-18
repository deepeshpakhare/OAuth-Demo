import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthPage from './AuthPage.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/auth/linkedin",
    element: <AuthPage/>
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>,
)
