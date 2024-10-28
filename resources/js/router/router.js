import { createRouter, createWebHistory } from "vue-router";
import Container from "../views/layouts/Container";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import Dashboard from "../views/pages/Dashboard";
import UserProfile from "../views/pages/UserProfile";
import Middleware from "../middleware";
import store from "../store";
import middlewarePipeline from "./middlewarePipeline";
import ForgotPassword from "../views/auth/ForgotPassword";
import ResetPassword from "../views/auth/ResetPassword";
import Settings from "../views/pages/Settings";
import Chat from "../views/pages/chat/Chat";

const routes = [
    {
        path: '/',
        name: 'Container',
        component: Container,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: {
            middleware: [Middleware.auth, Middleware.checkRoles]
            // middleware: [Middleware.auth, Middleware.admin]
        },
        roles: ['admin', 'developer', 'moderator']
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword,
    },
    {
        path: '/reset-password/:token',
        name: 'ResetPassword',
        component: ResetPassword,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            middleware: [Middleware.auth]
        },
    },
    {
        path: '/profile',
        name: 'UserProfile',
        component: UserProfile,
        meta: {
            middleware: [Middleware.auth]
        },
    },
    {
        path: '/chat',
        name: 'Chat',
        component: Chat,
    }

]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
      return next()
  }

  const middleware = to.meta.middleware

  const context = {
      to,
      from,
      next,
      store
  }
  return middleware[0]({
      ...context,
      next:  middlewarePipeline(context, middleware, 1)
  })

})



export default router
