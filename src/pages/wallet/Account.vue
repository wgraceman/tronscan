<template>
  <div class="col-md-9">
    <div class="margin-bottom-10 ">
      <div class="tab-v1">
        <ul class="nav nav-justified nav-tabs">
          <li class="active">
            <a>{{$t('wallet.account.overview')}}</a>
          </li>
        </ul>
        <div class="tab-content">
          <div id="overview" class="profile-edit tab-pane fade in active">
            <h2 class="heading-md">
              {{$t('wallet.account.aoverview')}}</h2>
            <!-- <p>Below are the username, email and overview information for your account.</p> -->

            <hr>
            <br>
            <dl class="dl-horizontal">
              <dt>
                <strong>{{$t('wallet.account.yourAddr')}}</strong>
              </dt>
              <dd>
                {{addr}}
              </dd>
              <dd style="color: red">
                {{$t('wallet.account.alert')}}
              </dd>

            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "loginStatus",
      "addr"
    ])
  }
};
</script>

