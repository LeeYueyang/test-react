export default [
    {
        path: '/login',
        component: Login,
        exact: true
    },
    {
        path: '/login/sub-login',
        component: Home,
        exact: true
    },
    {
        component: NotFound
    }
]