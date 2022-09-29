<template>
  <div class="sidebar-container" :style="{ width: !isCollapse ? '250px' : '70px' }">
    <div class="logo">
      <el-image fit="cover" src="src/assets/Sidebar/logo.png" alt="weiManage" />
      <span class="title" v-if="!isCollapse">Vue-Wei-Manage</span>
    </div>
    <div class="sidebar-list">
      <el-menu
        default-active="index"
        ref="elMenu"
        :router="true"
        class="el-menu-vertical"
        :unique-opened="true"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
        @select="selectMenu"
      >
        <template v-for="(item, i) in menuList" :key="item.title + i">
          <el-sub-menu :index="item.router" v-if="item.children">
            <template #title>
              <div class="item-container">
                <el-icon :size="1" color="red">
                  <Edit />
                </el-icon>
                <span>{{ item.title }}</span>
              </div>
            </template>
            <el-menu-item-group style="padding-left: 10px">
              <template v-for="(jtem, j) in item.children" :key="`${i}-${j}`">
                <el-sub-menu :index="jtem.router" v-if="jtem.children">
                  <template #title>
                    <div class="item-container">
                      <el-icon :size="1" color="red">
                        <Edit />
                      </el-icon>
                      <span>{{ jtem.title }}</span>
                    </div>
                  </template>
                  <el-menu-item-group style="padding-left: 10px">
                    <el-menu-item
                      :index="item.router"
                      v-for="(mtem, m) in jtem.children"
                      :key="`${i}-${j}-${m}`"
                    >
                      <div class="item-container">
                        <el-icon :size="1" color="red">
                          <Edit />
                        </el-icon>
                        <span>{{ mtem.title }}</span>
                      </div>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
                <el-menu-item :index="jtem.router" v-else>
                  <div class="item-container">
                    <el-icon :size="1" color="red">
                      <Edit />
                    </el-icon>
                    <span>{{ jtem.title }}</span>
                  </div>
                </el-menu-item>
              </template>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item :index="item.router" v-else>
            <div class="item-container">
              <el-icon :size="1" color="red">
                <Edit />
              </el-icon>
              <span>{{ item.title }}</span>
            </div>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="switch-list" :style="{ display: !isCollapse ? 'flex' : 'inline-block' }">
      <div class="switch-item">
        <el-icon v-if="isCollapse" title="收拢" @click="handle.arrow">
          <arrow-right-bold />
        </el-icon>
        <el-icon v-else title="收拢" @click="handle.arrow"><arrow-left-bold /></el-icon>
      </div>
      <div class="switch-item">
        <el-icon title="浮动" @click="handle.float"><paperclip /></el-icon>
      </div>
      <div class="switch-item">
        <el-icon title="大事记" @click="handle.bigThing"><info-filled /></el-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, toRefs, PropType } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// type
import { menuListType, reponseType } from '../../../type/index';

import { system } from '../../api/service';
// import { useElementMenu } from '../../hooks/useElementMenu';
export default defineComponent({
  name: 'Sidebar', // 侧边栏
  props: {
    // 标题logo
    logo: {
      type: String,
      default: '../../assets/Sidebar/logo.png',
    },
  },
  async setup(props, context) {
    const num = ref(100);
    const { logo } = props;
    const elMenu = ref(); // ref Menu元素
    const router = useRouter()

    const data = reactive({
      selectSign: 0,
    });

    // 菜单收拢状态
    const isCollapse = ref(false);

    const handle = reactive({
      // 收拢
      arrow: () => {
        console.log('点击收拢');
        isCollapse.value = !isCollapse.value;
        // context.emit("arrow", isCollapse.value);
      },
      // 浮动
      float: () => {
        console.log('点击浮动');
        context.emit('arrow', '点击浮动');
      },
      // 大事记
      bigThing: () => {
        console.log('大事记');
        context.emit('arrow', '大事记');
      },
    });

    const handleOpen = (key: string, keyPath: string[]) => {
      // key = key? key : 'index';
      // router.replace(key);
      console.log('handleOpen', key, keyPath);
    };
    const handleClose = (key: string, keyPath: string[]) => {
      console.log('handleClose', key, keyPath);
    };
    const selectMenu = (key: string, keyPath: string[]) => {
      console.log(key, keyPath, router);
    }

    // 菜单
    const res: reponseType = await system.getMenuList();
    const menuList: menuListType[] = res.data;

    onMounted(() => {});

    return {
      num,
      data,
      logo,
      handle,
      isCollapse,
      handleOpen,
      handleClose,
      menuList,
      elMenu,
      selectMenu
    };
  },
});
</script>

<style lang="less">
.sidebar-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 3px 3px #c8c8c8;
  -moz-box-shadow: 0px 3px 3px #c8c8c8;
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.4);
  border-right: 1px solid #dddfe5;
  transition: all 0.5s;
  overflow: hidden;
  white-space: nowrap;
  // color: #ffffff;

  .logo {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    .el-image {
      height: 40px;
      width: 40px;
      margin-right: 10px;
    }

    .title {
      color: #3176b1;
      font-size: 1em;
      font-weight: 600;
    }
  }

  .sidebar-list {
    width: 100%;
    height: calc(100% - 300px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    color: #575a64;

    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }

    .item-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      border-radius: 5px;
      // transition: all 0.2s;

      &:hover {
        background-color: #0ca296;
        // border: 1px solid #0ca296;
        color: #ffffff;
      }
    }
  }

  .switch-list {
    border-top: 0.5px solid #323741;
    width: 100%;
    height: 200px;
    transition: all 0.5s;
    padding-top: 20px;

    .switch-item {
      height: 40px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
}
</style>

<style lang="less">
// elementui 样式自定义
.el-menu-vertical {
  height: 100%;
  border: none;
  border-right: none !important;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: 100%;
}
.el-menu-item {
  padding: 5px 10px !important;

  &:hover {
    background-color: transparent !important;
  }

  &.is-active .item-container {
    background-color: #0ca296;
    // border: 1px solid #0ca296;
    color: #ffffff;
  }
}

.el-sub-menu {
  width: 100%;

  .el-sub-menu__title {
    padding: 5px 10px !important;

    &:hover {
      background-color: transparent !important;
      color: #fff;
    }
  }

  .el-menu-item-group__title {
    padding: 0;
  }
}
</style>
