<template>
  <div class="container content">
    <div class="row">
      <div class="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 ">
        <form id="form1" class="reg-page">
          <div class="reg-header">
            <img src="/static/trans_tron_logo.png" alt="logo" srcset="">
            <h2>
              {{$t('login.title')}}<br>
            </h2>
            <br> <br>
          </div>
          <div class="input-group margin-bottom-20">
            <span class="input-group-addon">
              <i class="fa fa-lock"></i>
            </span>
            <input maxlength="75" class="form-control" placeholder="Password" v-model="pass">
          </div>
          <br>
          <div class="row">
            <div class="col-md-6 checkbox">
              <label>
                <span title="Remember And Autologin"><input type="checkbox" v-model="remember"></span>
                {{$t('login.remember')}}
              </label>
            </div>
            <div class="col-md-6">
              <button :disabled="!isLoginValid" class="btn-u pull-right" @click.prevent="login">{{$t('login.login')}}</button>
            </div>
          </div>
          <div align="center">
            <div class="g-recaptcha" data-sitekey="6Le1YycTAAAAAJXqwosyiATvJ6Gs2NLn8VEzTVlS"></div>
          </div>
          <hr>
          <h4>{{$t('login.noAccount')}}</h4>
          <p>{{$t('login.noAccountMsg1')}}
            <router-link class="color-green" to="/register">{{$t('login.noAccountMsg2')}}</router-link>
            {{$t('login.noAccountMsg3')}}</p>
        </form>

      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
  name: "login",
  metaInfo: {
    title: "Login - Tronscan"
  },
  data() {
    return {
      pass: "",
      remember: false
    };
  },
  methods:{
    login(){
      const param= {
        pass: this.pass,
        remember: this.remember
      }
      this.loginAccount(param).then(() => {
        this.$router.push('/wallet/account')
      })
    },
    ...mapActions([
      'loginAccount'
    ])
  },
  computed: {
    isLoginValid() {
      if (!this.pass || this.pass.length === 0) {
        return false;
      }
      if (this.pass.length < 40) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="scss">

</style>
