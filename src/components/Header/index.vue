<template>
  <div class="header-container">
    <div class="info-container">
      <div class="crumbs">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item
            :to="{ path: '/' }"
            v-for="(item, i) in crumbs"
            :key="i"
          >
            <div class="crumbs-item">
              <el-icon><lightning /></el-icon>
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
        <el-icon><refresh /></el-icon>
        <div class="user-info">
          <el-avatar size="default" :src="userInfo.avator" />
          <span class="username">{{ userInfo.username }}</span>
          <el-icon><arrow-down /></el-icon>
        </div>
      </div>
    </div>
    <div class="tab-container">
      <div class="select-list">
        <div
          @click="handle.selectItem(i)"
          v-for="(item, i) in 5"
          :key="i"
          class="select-item"
          :class="data.selectIndex === i ? 'select-item-active' : ''"
        >
          <el-icon><bell /></el-icon>
          <span class="select-title">选择title111111111</span>
          <el-icon class="delete-item"><circle-close /></el-icon>
        </div>
      </div>
      <div class="right-droupdown">
        <el-dropdown placement="bottom"  popper-class="right-popper">
          <el-icon size="20" title="操作"><sort /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                  <el-icon><close /></el-icon>
                  <span>关闭其他</span>
              </el-dropdown-item>
              <el-dropdown-item>
                  <el-icon><arrow-left /></el-icon>
                  <span>关闭左侧</span>
              </el-dropdown-item>
              <el-dropdown-item>
                  <el-icon><arrow-right /></el-icon>
                  <span>关闭右侧</span>
              </el-dropdown-item>
              <el-dropdown-item>
                  <el-icon><close /></el-icon>
                  <span>关闭全部</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";

interface userInfoType {
  username: string;
  avator: string;
}

export default defineComponent({
  name: "header",
  props: {
    userInfo: {
      type: Object as PropType<userInfoType>,
      default: {
        username: "admin",
        avator:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      },
    },
    crumbs: {
      type: Object,
      default: [
        {
          name: "首页",
          icon: "",
        },
        {
          name: "工作台",
          icon: "",
        },
      ],
      selectList: {},
    },
  },
  setup(props, context) {
    const data = reactive({
      selectIndex: 0,
      moveIndex: -1,
    });

    const handle = reactive({
      selectItem: (index: number): void => {
        data.selectIndex = index;
      },
      moveItem: (index: number): void => {
        data.moveIndex = index;
      },
    });

    return {
      ArrowRight,
      handle,
      data,
    };
  },
});
</script>

<style lang="less" scoped>
.header-container {
  width: 100%;
  height: 110px;
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
      }
    }

    .info {
      display: flex;
      align-items: center;

      .el-icon {
        margin: 0 10px;
        cursor: pointer;
      }

      .user-info {
        display: flex;
        align-items: center;

        .username {
          display: inline-block;
          margin-left: 5px;
        }
      }
    }
  }

  .tab-container {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 0 0 10px;
    box-sizing: border-box;
    overflow: hidden;

    .select-list {
      display: flex;
      overflow: scroll;
      width: 100%;

      .select-item {
        display: flex;
        align-items: center;
        padding: 0 20px;
        white-space: nowrap;
        width: 150px;
        flex: 0 0 1;
        // border: 1px solid red;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        cursor: pointer;
        transition: all 0.5s;

        .select-title {
          display: inline-block;
          margin: 0 15px 0 5px;
          width: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .delete-item {
          display: none;
        }
      }

      .select-item:hover {
        background-color: #282c341a;
        width: 180px;

        .delete-item {
          display: inline;
        }
      }

      .select-item-active {
        color: #41b584;
        background-color: #ecf8f3;
        width: 180px;

        .delete-item {
          display: inline;
        }
      }
    }

    .right-droupdown {
      height: 100%;
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 1s;
    }

    .right-droupdown:hover {
      transform: rotate(360deg);
      color: #41b584;
    }
  }
}
</style>

<style lang="less" >
.el-dropdown-menu__item:hover{
    color: #41b584!important;
    background-color: #ecf8f3!important;
}
</style>>