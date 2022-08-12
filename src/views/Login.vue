<template>
  <div class="login">
    <div class="back">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
    </div>
    <div class="top">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-wangyiyunyinle"></use>
      </svg>
    </div>
    <div class="logInput">
      <div class="phone">
        <input type="text" placeholder="请输入手机号码" v-model="phone" />
      </div>
      <div class="password">
        <input type="password" placeholder="请输入密码" v-model="password" />
      </div>
    </div>
    <div class="confirmLog">
      <div class="confirm" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(['getLogin']),
    login: async function () {
      let res = this.getLogin({
        phone: this.phone,
        password: this.password,
      });
      console.log(res);
      if (res.data.code === 200) {
        this.$store.commit("updateIsLogin", ture);
        this.$router.push("/infoUser");
      } else {
        alert("手机号或密码错误");
        this.password = "";
      }
    },
  },
};
</script>

<style lang="less">
.login {
  height: 13.34rem;
  width: 100%;
  position: relative;
  margin: 0;
  background-color: rgb(224, 248, 220);
  .back{
    padding: .2rem;
    .icon{
      fill: rgb(220, 221, 220)
    }
  }
  .top {
    height: 4.46rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      width: 3rem;
      height: 3rem;
    }
  }
  .logInput{
    height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .phone{
      padding: .3rem;
      input{
        padding-left: .3rem;
        width: 5rem;
        height: .5rem;
        border: none;
      }
    }
    .password{
      input{
        padding-left: .3rem;
        width: 5rem;
        height: .5rem;
        border: none;
      }
    }
  }
  .confirmLog{
    display: flex;
    justify-content: center;
    align-items: center;
    .confirm{
      width: 4rem;
      height: .8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(88,224,0);
      border-radius: .4rem;
      color: aliceblue;
    }
  }
}
</style>