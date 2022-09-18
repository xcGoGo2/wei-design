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
}
</style>

<style lang="less" >
.el-dropdown-menu__item:hover{
    color: #41b584!important;
    background-color: #ecf8f3!important;
}
</style>>