import Layout from '@/views/Layout'
import { AST_Await } from 'terser'
//   @ = src
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
        path: 'my-target',
        component: () => import('@/views/Home'),
        name: 'my-target',
        meta: {
          title: '我的目标',
          icon: '',
        }
      },
      {
        path: 'all-target',
        component: () => import('@/views/Home'),
        name: 'all-target',
        meta: {
          title: '全部目标',
          icon: '',
        }
      },
      {
        path: 'tree',
        component: () => import('@/views/ErrorPage/404'),
        name: 'tree',
        meta: {
          title: '目标关系树',
          icon: '',
        }
      },
      {
        path: 'draft',
        component: () => import('@/views/ErrorPage/404'),
        name: 'index',
        meta: {
          title: '草稿箱',
          icon: '',
        }
      },
      {
        path: 'operation',
        component: () => import('@/views/ErrorPage/404'),
        name: 'operation',
        meta: {
          title: '运营报告',
          icon: '',
        }
      },
      {
        path: 'progress',
        component: () => import('@/views/ErrorPage/404'),
        name: 'progress',
        meta: {
          title: '进度报告',
          icon: '',
        }
      },
      {
        path: 'score',
        component: () => import('@/views/ErrorPage/404'),
        name: 'socre',
        meta: {
          title: '评分报告',
          icon: '',
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true },
]

export const asyncRouterMap = [
]
