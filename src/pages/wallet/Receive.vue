<template>
  <div class="col-md-9">

    <form method="post" action="./myaccount" id="form1" class="sky-form">

      <div class="margin-bottom-10 ">
        <div class="tab-v1">
          <ul class="nav nav-justified nav-tabs">
            <li class="active">
              <a>{{$t('wallet.recv.title')}}</a>
            </li>
          </ul>
          <div class="profile-edit">
            <div class="text-center profile-rec">
              <img :src="qrcode">
              <h5>{{$t('wallet.recv.scan')}}</h5>
              <hr>
              <br>
              <div class="input-group margin-bottom-20">
                <input disabled class="form-control" v-model="addr">
                <span class="input-group-addon" style="cursor: pointer" v-clipboard:copy="addr" @success="handleSuccess" v-tooltip="{
                        content: 'Copy Success',
                        show: tooltip,
                        trigger: 'manual',
                        placement: 'bottom',
                      }">
                  <i class="fa fa-copy"></i>
                </span>
              </div>
              <br>
            </div>

          </div>
        </div>
      </div>

    </form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import * as QRCode from "qrcode";
import { passwordToAddress } from "@tronprotocol/wallet-api/src/utils/crypto";
export default {
  data() {
    return {
      qrcode: null,
      tooltip: false
    };
  },
  mounted() {
    let rootUrl = process.env.PUBLIC_URL || window.location.origin;

    QRCode.toDataURL(
      `${rootUrl}/#/send?to=${this.addr}`,
      (err, url) => {
        this.qrcode = url;
      }
    );
  },
  computed: {
    ...mapGetters(["addr"])
  },
  methods: {
    handleSuccess() {
      this.tooltip = true;
      setTimeout(() => {
       this.tooltip = false
      }, 3000);
    },
  }
};
</script>
<style lang="scss">
.profile-rec {
  padding: 0 50px;
}
@media (max-width: 768px) {
  .profile-rec {
    padding: 0;
  }
}
</style>

