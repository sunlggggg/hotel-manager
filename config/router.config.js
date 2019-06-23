const routes = [
  {
    path: '/user',
    component: '../layouts/UserLayout/UserLayout',
    routes: [
      {path: '/', redirect:'/user/login'},
      
      { path: '/user', redirect: '/user/login' },
      {
        path: '/user/login',
        component: './user/login'
      },
    ]
  },
  {
      path:'/room',
      component: '../layouts/index',
      routes: [
        {
          path: '/room/list',
          component: './List/RoomList'
        },
        {
          path: '/room/checkin',
          component: './checkin/CheckIn'
        },
      ]
  },
  {
    path: '/',
    component: '../layouts/UserLayout/UserLayout',
    routes: [
        {path: '/', redirect:'/user/login'},
        {
            path: '/user/login',
            component: './user/login'
        }
    ]
  }
]

export default routes
