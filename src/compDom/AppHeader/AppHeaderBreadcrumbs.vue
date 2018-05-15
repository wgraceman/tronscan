<template>
  <div class="breadcrumbs" v-if="breadcrumbs.length > 0">
    <div class="container">

      <ul class="pull-left breadcrumb">
        <template v-for="(crumb,index) in breadcrumbs">
          <li v-if="index === breadcrumbs.length - 1" :key="index"
              class="activeRouter">
            {{$t('nav.'+crumb.name)}}
          </li>
          <li v-else :key="index"
              @click="pageRouter(crumb.name)"
              :class="{'active': crumb.name === active}"
          >
            <router-link :to="crumb.path" :key="index">{{$t('nav.'+crumb.name)}}</router-link>
          </li>
        </template>
      </ul>
      <!-- <h1 class="pull-right">{{head}}
        <span class="lead-modify" style="color: #999999">&nbsp;</span><br>
      </h1> -->
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    data () {
      return {
        active: ''
      }
    },
    mounted () {
      this.active = this.$route.name      
    },
    computed: {
      head() {
        return this.$route.meta.head;
      },
      breadcrumbs(){
        return this.$route.meta.breadcrumbs;
      },
      ...mapGetters({
        getPageRouter: 'pageRouter'
      })
    },
    methods: {
      pageRouter (name) {
        this.active = name
        this.setPageRouter(name)
      },
      ...mapActions({
        setPageRouter: 'pageRouter'
      })
    },
    watch: {
      getPageRouter (router) {
        this.active = router
      }
    }
  };
</script>

<style lang="scss" scoped>
  .activeRouter {
    color: #cd534c !important;
  }

  li{
    cursor: pointer;
  }
</style>
