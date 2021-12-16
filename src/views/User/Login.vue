<template>
  <div class="w-screen h-screen bg-gray-100 bg-cover bg-loginpage">
    <div class="layout-login" @keyup="enterSubmit">
      <div class="flex items-center justify-center mb-5">
        <img alt="logo" class="block" src="/logo.png" />
      </div>
      <h3 class="mb-6 text-2xl font-semibold text-center text-gray-800">住范儿门店</h3>
      <el-form ref="ruleForm" label-position="right" label-width="80px" :model="form" :rules="rules">
        <el-form-item class="mb-6 -ml-20">
          <div class="flex justify-between">
            收银台：
            <el-select class="flex-1" placeholder="请选择当前收银台" v-model="cashId" @change="changeCashId">
              <el-option value="0001">0001</el-option>
              <el-option value="0002">0002</el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item class="mb-6 -ml-20" prop="name">
          <el-input v-model="form.name" placeholder="请输入用户名" prefix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item class="mb-6 -ml-20" prop="pwd">
          <el-input v-model="form.pwd" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password />
        </el-form-item>
        <el-form-item class="mb-6 -ml-20">
          <el-button type="primary" class="w-full" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useStore, store } from '@/store/index';
import { validate } from '@/utils/formExtend';
const formRender = () => {
  let form = reactive({
    name: 'admin',
    pwd: 'admin',
  });
  const ruleForm = ref(null);
  const enterSubmit = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };
  const onSubmit = async () => {
    let { name, pwd } = form;
    if (!(await validate(ruleForm))) return;
    await store.dispatch('layout/login', { username: name, password: pwd });
    ElNotification({
      title: '欢迎',
      message: '欢迎回来',
      type: 'success',
    });
  };
  const rules = reactive({
    name: [
      {
        validator: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('用户名不能为空'));
          }
          callback();
        },
        trigger: 'blur',
      },
    ],
    pwd: [
      {
        validator: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('密码不能为空'));
          }
          callback();
        },
        trigger: 'blur',
      },
    ],
  });
  return {
    form,
    onSubmit,
    enterSubmit,
    rules,
    ruleForm,
  };
};
export default {
  name: 'Login',
  setup() {
    const store = useStore();
    let cashId = ref(store.state.layout.cashId);

    function changeCashId(e) {
      cashId.value = e;
      store.commit('layout/refreshCashId', e);
    }
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      cashId,
      changeCashId,
      ...formRender(),
    };
  },
};
</script>

<style lang='postcss' scoped>
.common-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background-color: @layout-body-background;
  background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: 110px;
  background-size: 100%;
  .content {
    padding: 32px 0;
    flex: 1;
    @media (min-width: 768px) {
      padding: 112px 0 24px;
    }
  }
}
.layout-login {
  padding-top: 200px;
  width: 400px;
  margin: 0 auto;
  background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: 110px;
  background-size: 100%;
  /* :deep(.el-input__inner) {
    border: 1px solid hsla(0, 0%, 100%, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #ddd;
  } */
}
</style>