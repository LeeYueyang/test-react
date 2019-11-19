import Login from '../components/login';
import Home from '../components/home';
import NotFound from '../components/not-found';

export default [
    {
        path: '/login',
        component: Login,
        exact: true
    },
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        component: NotFound
    }
]