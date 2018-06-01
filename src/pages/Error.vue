<template>
  <div class="container content">

    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="error-v1">
          <!-- <img src="/static/Plaster.png" width="100"> 
          <h1>Error</h1> -->
          <br><br>
          <span v-html="computedmsg"></span>
          <span v-html="msg"></span>
          <br>
          <router-link class="btn-u btn-bordered" to="/" target="_parent" v-if="!showLoginButton">{{$t('error.back')}}</router-link>
          <router-link class="btn-u btn-bordered" to="/login" target="_parent" v-else>{{$t('error.login')}}</router-link>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  mounted() {
    let msg = this.$route.query.msg;
    switch (msg) {
      case "login":
        this.msgType = 1;
        this.showLoginButton = true;
        break;
      case "BlockNumberTooLarge":
        this.msgType = 2;
        break;
      default:
        this.msg=msg
        this.msgType = 3;
        break;
    }
  },
  data() {
    return {
      msg: "",
      msgType: 0,
      showLoginButton: false,
    };
  },
  computed: {
    computedmsg() {
      switch (this.msgType) {
        case 0:
          return ""
          break;
        case 1:
          return this.$t('error.loginMsg');
          break;
        case 2:
          return this.$t('error.blockNumberMsg');
          break;
        case 3:
          return this.$t('error.defaultMsg');
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss">
.error-v1 {
  padding-bottom: 30px;
  text-align: center;
}
.error-v1 p {
  color: #555;
  font-size: 16px;
}
.error-v1 span {
  color: #555;
  display: block;
  font-size: 35px;
  font-weight: 200;
}
.error-v1 span.error-v1-title {
  color: #777;
  font-size: 180px;
  line-height: 200px;
  padding-bottom: 20px;
}
@media (max-width: 500px) {
  .error-v1 p {
    font-size: 12px;
  }
  .error-v1 span {
    font-size: 25px;
  }
  .error-v1 span.error-v1-title {
    font-size: 140px;
  }
}
</style>
