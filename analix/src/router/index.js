import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import routes from '@/router/routes'
import { sidebarState } from '@/composables'
import supabase from '@/supabaseClient'
import { push } from '@/main'

const router = createRouter({
  history: createWebHashHistory('kui-dashboard-vue'),
  routes,
})

router.beforeEach(async (to) => {
  NProgress.start();

  let authenticated = await isAuthenticated();

  if (!authenticated && to.meta.requiresAuth) {
    push.info('La sesión ha expirado')
    return { name: "Login" };
  }
})

async function isAuthenticated() {
  const { data, error } = await supabase.auth.getSession();

  if (data.session == null || error != null) return false;
  else return true;
}

router.afterEach(() => {
  if (window.innerWidth <= 1024) {
    sidebarState.isOpen = false
  }
  NProgress.done()
})

export default router
