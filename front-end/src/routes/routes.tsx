
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Post from "@/pages/Post";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const routes = [
    {
        path: "/",
        element: <ProtectedRoute element={<Home />} />,
    },
    {
        path: "/home",
        element: <ProtectedRoute element={<Home />} />,
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
        element: <ProtectedRoute element={<Post />} />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
];

const router = createBrowserRouter(routes);
export default router;