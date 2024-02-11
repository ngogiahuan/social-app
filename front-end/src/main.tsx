import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import Post from './pages/Post.tsx'
import NotFound from './pages/NotFound.tsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './components/ui/loading.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/post/:id",
    element: <Post />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
