<template>
  <div class="header-container">
    <div class="info-container">
      <div class="crumbs">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item
            :to="i === 0 ? { path: '/' } : ''"
            v-for="(item, i) in crumbs"
            :key="i"
          >
            <div class="crumbs-item">
              <el-icon>
                <svg-icon :name="item.icon"></svg-icon>
              </el-icon>
              <span class="crumbs-name">{{ item.name }}</span>
            </div>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="info">
        <el-icon><search /></el-icon>
        <el-icon><bell /></el-icon>
        <el-icon><full-screen /></el-icon>
        <el-icon><magic-stick /></el-icon>
        <el-icon><folder-opened /></el-icon>
        <el-icon @click="refresh" title="刷新"><refresh /></el-icon>
        <div class="">
          <el-dropdown>
            <span class="user-info">
              <el-avatar size="default" :src="userInfo.avator" />
              <span class="username">{{ userInfo.username }}</span>
              <el-icon><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(item, i) in goUrl"
                  :key="i + item.name"
                  @click="goTo(item)"
                >
                  <svg-icon :name="item.icon" color="#0ca296"></svg-icon>
                  <span class="item-class">{{ item.name }}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch, computed } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { menuListType, userInfoType } from '@/type';
import { getItem, removeItem, clearCookie, deepCopy } from '@/utils';
import { useStorage } from '@/hooks/useStorage';
import { use } from 'echarts';

type goUrlType = {
  name: string;
  icon: string;
  path: string;
};

const { remove } = useStorage('session');


export default defineComponent({
  name: 'DesignHeader',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const data = reactive({
      selectIndex: 0,
      moveIndex: -1,
    });

    const menuList = computed((): menuListType[] => store.state.menuList);

    const crumbs: {
      name: any;
        icon: string;
    }[] = reactive([
      {
        name: '首页',
        icon: 'index',
      },
      {
        name: '首页',
        icon: 'index',
      },
    ]);

    // userInfo
    const userInfo = reactive<userInfoType>({
      username: 'admin',
      avator: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    });

    const loginContent = getItem('loginContent');

    userInfo.username = loginContent ? loginContent.showname : '';

    // userInfo 用户信息跳转
    const goUrl: goUrlType[] = reactive([
      {
        name: 'GitHub',
        icon: 'github',
        path: 'https://github.com/Wayne1308/weiDesign',
      },
      {
        name: '退出登录',
        icon: 'exit',
        path: 'exit',
      },
    ]);

    const goTo = (item: goUrlType) => {
      switch (item.path) {
        case 'exit':
          remove('design.token');
          router.push('/login');
          break;

        default:
          window.open(item.path);
          break;
      }
    };

    const refresh = () => {
      window.location.reload();
    };

    const initCrumbs = (routeData: any) => {
      crumbs.length > 1 && crumbs.splice(1);
      const path = routeData.path.split('/').filter((o: any) => o);
      let list = [...menuList.value];
      while (path.length > 0) {
        const item: menuListType | undefined = list.find((o: menuListType) => o.icon === path[0]);
        crumbs.push({
          name: item?.showName || routeData.name,
          icon: item?.icon || '',
        });
        if (item && item.children) {
          list = item.children;
        }
        path.shift();
            }
    };

    initCrumbs(route);

    watch(route, (newV, oldV) => {
      initCrumbs(newV);
    });

    return {
      ArrowRight,
      data,
      crumbs,
      userInfo,
      goUrl,
      goTo,
      refresh,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  height: 100%;
  background-color: #fff;

  .info-container {
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dddfe5;

    .crumbs {
      margin-left: 10px;
      .crumbs-item {
        display: flex;
        align-items: center;
        justify-content: center;

        .crumbs-name {
          margin-left: 5px;
        }

        .el-icon {
          &:hover {
            color: #0ca296;
          }
        }
      }
    }

    .info {
      display: flex;
      align-items: center;

      .el-icon {
        margin: 0 10px;
        cursor: pointer;

        &:hover {
          color: #0ca296;
        }
      }

      .user-info {
        display: flex;
        align-items: center;
        cursor: pointer;

        .username {
          display: inline-block;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.el-breadcrumb__inner a:hover,
.el-breadcrumb__inner.is-link:hover {
  color: #0ca296 !important;
}
.el-breadcrumb__inner .el-icon:hover {
  color: #0ca296;
}
.el-dropdown-menu__item:hover {
  color: #0ca296 !important;
  background-color: #ecf8f3 !important;
}
.el-dropdown-menu__item {
  .item-class {
    display: inline-block;
    margin-left: 5px;
  }
}
</style>
>
