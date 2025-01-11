import { createBrowserRouter } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import { Home } from './Components/Home';
import User from './Components/NavbarPage/Users';
import Products from './Components/NavbarPage/Products';
import Categories from './Components/NavbarPage/Categories';
import About from './Components/NavbarPage/AboutMe';
import NotFound from './Components/NotFoundPages';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginForm />
    },
    {
        path: "/",
        element:<ProtectedRoute element={ <Home />} />,
    },
    {
        path: "user",
        element:<ProtectedRoute element={<User />} />
    },
    {
        path: "products",
        element:<ProtectedRoute element={<Products />} />
    },
    {
        path: "categories",
        element:<ProtectedRoute element={<Categories />} />
    },
    {
        path: "about",
        element: <ProtectedRoute element={<About />} />
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
