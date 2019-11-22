import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Login from '../views/login/Login'
const Login = () => import('@/views/login/Login')
const Homepage = () => import('@/views/homepage/Homepage')
const Department = () => import('@/views/department/Department')
const Employee = () => import('../views/employee/Employee')
const AddEmployee = () => import('../views/employee/AddEmployee')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/department'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '',
    component: Homepage, // router-view
    children: [
      {
        path: '/department',
        component: Department,
        meta: {
          name: '部门管理',
          path: '/department'
        }
      },
      {
        path: '/employee',
        component: Employee,
        meta: {
          name: '员工管理',
          path: '/employee',
        }
      },
      {
        path: '/employee/add',
        component: AddEmployee,
        meta: {
          name: '添加员工信息',
          path: '/employee',
        }
      },
      {
        path: '/employee/edit/:eid',
        component: AddEmployee,
        meta: {
          name: '编辑员工信息',
          path: '/employee',
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

// 路由守卫
router.beforeEach((to, from , next) => {
  console.log(to, from)
  // 跳转非登录页的其他界面,并且没有token
  if (to.path !== '/login' && !localStorage.getItem('token')) {
    return next('/login')
  } else if (to.path === '/login' && localStorage.getItem('token')) {
    return next(from)
  }
  next()
})

export default router
