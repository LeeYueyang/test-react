export default [
    {
        path: '/home',
        component: Login,
        exact: true,
        children: [
            {
                path: '/sub-home',
                component: Login,
                exact: true
            }
        ]
    },
    {
        path: '/home/sub-home',
        component: Home,
        exact: true
    },
    {
        component: NotFound
    }
]