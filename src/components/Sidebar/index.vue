<template>
  <div class="sidebar-container" >
    <div class="logo">
      <el-image fit="cover" :src="logo" alt="weiManage" />
    </div>
    <div class="sidebar-list">
      <div class="sign" :class="i === data.selectSign? 'selectSign': 'noSelectSign'" v-for="(item, i) in itemList" :key="i"  @click="handle.selectItem(i)">
        <el-icon :size="16" color="#FFFFFF"><folder-checked /></el-icon>
        <span class="sign-title">{{item.name}}</span>
      </div>
    </div>
    <div class="switch-list">
      <div class="switch-item">
        <el-icon title='收拢' @click="handle.arrow" ><arrow-left-bold /></el-icon>
      </div>
      <div class="switch-item">
        <el-icon title='浮动' @click="handle.float"><paperclip /></el-icon>
      </div>
      <div class="switch-item">
        <el-icon title='大事记'  @click="handle.bigThing"><info-filled /></el-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, PropType } from "vue";

// props数据类型格式
interface itemListType {
  name: string;
  icon: string;
  path: string;
  list: itemList_listType[];
}
interface itemList_listType {
  [propName: string]: string;
}

export default defineComponent({
  name: "Sidebar",  // 侧边栏
  props: {
    // 标题logo
    logo: {
      type: String,
      default:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    },
    // 列表配置项
    itemList: {
      type: Array as PropType<itemListType[]>,
      default: [
        {
          name: "标题一",
          icon: "",
          path: "",
          list: [
            { name: "子标题1", icon: "", path: "" },
            { name: "子标题2", icon: "", path: "" },
          ],
        },
        {
          name: "标题二",
          icon: "",
          path: "",
          list: [
            { name: "子标题1", icon: "", path: "" },
            { name: "子标题2", icon: "", path: "" },
          ],
        },
        {
          name: "标题三",
          icon: "",
          path: "",
          list: [
            { name: "子标题1", icon: "", path: "" },
            { name: "子标题2", icon: "", path: "" },
          ],
        },
      ],
    },
  },
  setup(props, context) {
    const num = ref(100);
    const { logo, itemList } = props;
    console.log(props);

    const data = reactive({
      selectSign: 0,
    })

    const handle = reactive({
      // 选择item
      selectItem: (index: number) => {
        data.selectSign = index
        console.log(index);
      },
      // 收拢
      arrow: () => {
        console.log('点击收拢');
        context.emit('arrow','点击收拢')
      },
      // 浮动
      float: () => {
        console.log('点击浮动');
        context.emit('arrow','点击浮动')
      },
      // 大事记
      bigThing: () => {
        console.log('大事记');
        context.emit('arrow','大事记')
      },
    })

    return {
      num,
      data,
      logo,
      itemList,
      handle
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
  background-color: #282c34;
  color: #FFFFFF;

  .logo {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    .el-image {
      height: 60px;
      width: 60px;
      border-radius: 50%;
    }
  }

  .sidebar-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
   

    .sign {
      height: 60px;
      width: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      cursor: pointer;

      .el-icon svg {
        font-size: 16px;
      }

      span {
        margin-top: 5px;
        font-weight: 500;
      }

    }

    .selectSign {
      background-color: #41b584;
    }

    .noSelectSign:hover {
      background-color: #323741;
      
    }
  }

  .switch-list {
    border-top: 0.5px solid #323741;
    width: 100%;

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
