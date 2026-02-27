import { createBrowserRouter } from 'react-router-dom';
// Impoartando a aestrutura base
import App from './App';

// importando as páginas
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewPost from './pages/NewPost';
import EditPost from './pages/EditPost';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // O App agora éo nosso "esqueleto principal
        children: [
            { path: "/", element: <Home/> },
            { path: "/post/:id", element: <Post/> },
            { path: "/login", element: <Login/> },
            { path: "/register", element: <Register/> },
            { path: "/dashboard", element: <Dashboard/> },
            { path: "/new-post", element: <NewPost/> },
            { path: "/edit-post/:id", element: <EditPost/> },
        ],

    },
]);