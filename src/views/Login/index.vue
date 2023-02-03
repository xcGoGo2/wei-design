<!--
 * @Author: chenwei
 * @Date: 2022-02-10 17:22:26
 * @LastEditors: chenwei
 * @LastEditTime: 2022-02-11 18:27:11
 * @FilePath: \weiDesign\src\views\Login\index.vue
 * @Description: 登录页
 *
-->

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="hello">HELLO！</div>
      <div class="welcome">欢迎来到weiDesign！</div>
      <div class="center">
        <el-input
          :prefix-icon="Avatar"
          size="medium"
          class="login-username"
          type="text"
          v-model="loginForm.username"
        ></el-input>
        <el-input
          :prefix-icon="Lock"
          size="medium"
          class="login-password"
          type="password"
          v-model="loginForm.password"
        ></el-input>
      </div>
      <el-button  type="" color="#0ca296" @click="loginForm.click">登录</el-button>
      <div class="goRegister-box">
        <span class="goRegister" @click="goRegister">注册</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Avatar, Lock } from '@element-plus/icons-vue';
import { ElMessage, ElNotification } from 'element-plus';
import { reactive, defineComponent, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { system } from '@/api/service';
import { setItem } from '@/utils/index';
export default defineComponent({
  name: 'index',
  components: {},
  setup() {
    // 路由api创建
    const router = useRouter();
    const route = useRoute();
    // 账号密码 + 登录
    interface loginType {
      username: string;
      password: string;
      click(): void;
    }
    let loginForm: loginType = reactive({
      username: 'admin',
      password: '123456',
      click: async () => {
        if (loginForm.username !== '' && loginForm.password !== '') {
          const { username, password } = loginForm;
          const res = await system.login({username, password});
          if(res && res.code === 200) {
            // 登录成功
            setItem('loginContent', res.data);
            router.push({ path: '/home' });
            ElNotification({
              title: '登录成功！',
              message: '欢迎登录weiDesign设计系统！',
              type: 'success',
              offset: 50,
              duration: 2000
            });
          }
        } else {
          ElMessage({
            message: '账号密码不能为空！',
            type: 'warning',
          });
          return;
        }
      },
    });

    // 切换至注册
    const goRegister = () => {
      console.log('转换至注册');
    };

    onMounted(async () => {});

    return {
      loginForm,
      goRegister,
      Avatar,
      Lock,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  width: 100vw;
  background-image: url('../../assets/login/login.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;

  .login-box {
    width: 30vw;
    height: 85%;
    background-color: rgba(60, 106, 118, 0.6);
    color: #fff;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 100px;
    padding: 20px;
    display: flex;
    flex-direction: column;

    .hello {
      font-size: 50px;
      font-weight: 900;
      margin: 10px 0;
    }
    .welcome {
      margin: 10px 0;
      font-size: 30px;
    }
    .center {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 50px 0;

      .login-username,
      .login-password {
        margin: 10px;
      }
    }
    .goRegister-box {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;

      .goRegister {
        margin: 15px 0;
        font-weight: 900;
        cursor: pointer;
      }
    }
  }
}
</style>
