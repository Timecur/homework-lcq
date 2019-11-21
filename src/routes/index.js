import Layout from '@/views/Layout'

export const constantRouterMap = [
  {
    path: '/',
    redirect: { name: 'home' },
  },
  {
    path: '/404',
    component: () => import('@/views/ErrorPage/404'),
    hidden: true
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/Auth'),
  },
  {
    path: '/home',
    component: Layout,
    name: 'home',
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/Home'),
        name: 'index',
        meta: {
          title: '首页',
          icon: 'home',
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true },
]

export const asyncRouterMap = [
]
