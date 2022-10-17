// 引入router
import { createRouter, createWebHashHistory } from 'vue-router';
// 引入routes配置
import routes from './routes';
import { getItem } from '@/utils';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const isAuthenticated = getItem('loginContent');
  if (
    // 检查用户是否已登录
    !isAuthenticated &&
    // ❗️ 避免无限重定向
    to.name !== 'Login'
  ) {
    // 将用户重定向到登录页面
    return { name: 'Login' };
  }
});

export default router;
