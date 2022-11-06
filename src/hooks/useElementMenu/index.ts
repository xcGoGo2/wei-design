import { ElMenu } from 'element-plus';
import { reactive, ref } from 'vue';
import { menuListType } from '@/type';

const arr: any[] = [];
export const useElementMenu = (element: Element, menuList: menuListType[]) => {
  console.log('element', element);
  console.log('menuList', menuList);
  buildTree(menuList);
  return arr.join('');
};

let level = 0;
function buildTree (list: menuListType[]) {
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    const str = `
    <template>
      <el-menu-item :index="${level}-${i}">
        <div class="item-container">
          <el-icon :size="1" color="red">
            <Edit />
          </el-icon>
          <span>${element.title}</span>
        </div>
      </el-menu-item>
    </template>
    `;
    arr.push(str)
    if(element.children) {
      level += 1; // 层级加一
      buildTree(element.children);
      level -= 1;  // 递归完成后恢复
    }
  }
}

// <template v-for="(item, i) in menuList" :key="item.title + i">
//   <el-sub-menu index="i" v-if="item.children">
//     <template #title>
//       <div class="item-container">
//         <el-icon :size="1" color="red">
//           <Edit />
//         </el-icon>
//         <span>{{ item.title }}</span>
//       </div>
//     </template>
//     <el-menu-item-group style="padding-left: 10px">
//       <el-menu-item
//         :index="`${i}-${j}`"
//         v-for="(jtem, j) in item.children"
//         :key="`${i}-${j}`"
//       >
//         <div class="item-container">
//           <el-icon :size="1" color="red">
//             <Edit />
//           </el-icon>
//           <span>{{ jtem.title }}</span>
//         </div>
//       </el-menu-item>
//     </el-menu-item-group>
//   </el-sub-menu>
//   <el-menu-item :index="i" v-else>
//     <div class="item-container">
//       <el-icon :size="1" color="red">
//         <Edit />
//       </el-icon>
//       <span>{{ item.title }}</span>
//     </div>
//   </el-menu-item>
// </template>
