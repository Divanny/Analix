export default [
  {
    path: '/',
    component: () => import('@/layouts/DashboardLayout.vue'),
    children: [
      {
        path: '/',
        name: 'Dashboard',
        meta: { requiresAuth: true },
        component: () => import('@/views/Index.vue'),
      },
      {
        path: '/pages/blank',
        name: 'Blank',
        meta: { requiresAuth: true },
        component: () => import('@/views/pages/Blank.vue'),
      },
    ],
  },
  {
    path: '/Ventas',
    component: () => import('@/layouts/DashboardLayout.vue'),
    children: [
      {
        path: '/Ventas',
        name: 'Ventas',
        meta: { requiresAuth: true },
        component: () => import('@/views/ventas/Listado.vue'),
      },
      {
        path: '/Ventas/Formulario',
        name: 'FormularioVentas',
        meta: { requiresAuth: true },
        component: () => import('@/views/ventas/Formulario.vue'),
      },
    ],
  },
  {
    path: '/Productos',
    component: () => import('@/layouts/DashboardLayout.vue'),
    children: [
      {
        path: '/Productos',
        name: 'Productos',
        meta: { requiresAuth: true },
        component: () => import('@/views/productos/Listado.vue'),
      },
    ],
  },
  {
    path: '/Auth',
    name: 'Auth',
    component: () => import('@/layouts/AuthenticationLayout.vue'),
    redirect: '/Auth/Login',
    children: [
      {
        path: '/Auth/Login',
        name: 'Login',
        meta: { requiresAuth: false },
        component: () => import('@/views/auth/Login.vue'),
      },
      {
        path: '/Auth/Register',
        name: 'Registro',
        meta: { requiresAuth: false },
        component: () => import('@/views/auth/Register.vue'),
      },
      {
        path: '/Auth/ConfirmarCorreo',
        name: 'ConfirmarCorreo',
        meta: { requiresAuth: false },
        component: () => import('@/views/auth/VerifyEmail.vue'),
      },
      {
        path: '/auth/forgot-password',
        name: 'ForgotPassword',
        meta: { requiresAuth: false },
        component: () => import('@/views/auth/ForgotPassword.vue'),
      },
      {
        path: '/auth/reset-password',
        name: 'ResetPassword',
        meta: { requiresAuth: false },
        component: () => import('@/views/auth/ResetPassword.vue'),
      },
      {
        path: '/auth/confirm-password',
        name: 'ConfirmPassword',
        meta: { requiresAuth: false },
        component: () => import('@/views/auth/ConfirmPassword.vue'),
      },

    ],
  },
]
