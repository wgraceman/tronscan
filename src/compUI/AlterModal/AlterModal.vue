<template>
  <transition name="modal-fade">
  <div class="modal fade in" id="myModal" tabindex="-1" role="dialog"
       aria-labelledby="myModalLabel"
       aria-hidden="false"
       v-show="hide"
       @click.stop
  >
    <div class="modal-backdrop fade in" style="height: -webkit-fill-available;" @click="hidden"></div>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button aria-hidden="true" data-dismiss="modal" class="close" type="button"  @click="hidden">
            ×
          </button>
          <h4 id="myModalLabel" class="modal-title">
            Please login to try again
          </h4></div>
        <div class="modal-footer">
          <button data-dismiss="modal" class="btn-u btn-u-default" type="button" @click="hidden">
            Cancel
          </button>
          &nbsp;
          <input type="submit" value="End"
                 @click="hidden"
                 class="btn-u">
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        hide: false
      }
    },
    methods: {
      show () {
        this.hide = true
      },
      hidden () {
        this.hide = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modal-fade-enter-active, .modal-fade-leave-active {
    transition: all .5s;
    .modal-dialog{
      transition: all .5s;
    }
  }
  .modal-fade-enter, .modal-fade-leave-to{
    opacity: 0;
    .modal-dialog{
      transform: scale(.9);
    }
  }

  .modal {
    display: block;
    padding: 0 17px;
  }

  .input {
    max-width: 398px;
    width: 100%;
  }

  h5 {
    margin-top: 12px;
    span {
      display: flex;
    }
  }

  .modal-dialog {
    padding: 0;
    position: relative;
    width: auto;
    margin: 180px auto;
  }

  @media (min-width: 768px) {
    .modal-dialog {
      width: 320px;
      margin: 180px auto;
    }
  }

</style>
