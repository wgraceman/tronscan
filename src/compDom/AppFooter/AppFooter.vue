<template>
  <div class="footer-v1">
    <div class="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-3 map-img md-margin-bottom-40">
            <a href="#" rel="nofollow">
              <img id="logo-footer" class="footer-logo" src="/static/footer.png" alt="">
            </a>
            <p style="color: #f7f7f7">
              {{$t('footer.note')}}
            </p>
          </div>

         
          <div class="col-md-3 md-margin-bottom-40">
          </div>

          <!--telegram-->
          <div class="col-md-3 md-margin-bottom-40">
            <div class="headline">
              <h2>
                Telegram
              </h2>
            </div>
            <address class="md-margin-bottom-40">
              <table>
                <tbody>
                <tr>
                  <td>
                    <i class="fa fa-telegram"></i>
                  </td>
                  <td>
                    <a href="https://t.me/tronnetworkCN" target="_blank"> {{$t('footer.tel.cn')}}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i class="fa fa-telegram"></i>
                  </td>
                  <td>
                    <a href="https://t.me/tronnetworkEN" target="_blank">{{$t('footer.tel.en')}}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i class="fa fa-telegram"></i>
                  </td>
                  <td>
                    <a href="https://t.me/tronnetworkKR" target="_blank">{{$t('footer.tel.kr')}}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i class="fa fa-telegram"></i>
                  </td>
                  <td>
                    <a href="https://t.me/tronnetworkRU" target="_blank">{{$t('footer.tel.ru')}}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i class="fa fa-telegram"></i>
                  </td>
                  <td>
                    <a href="https://t.me/tronnetworkUS" target="_blank">{{$t('footer.tel.us')}}</a>
                  </td>
                </tr>
                </tbody>
              </table>
            </address>
          </div>

          <!--twitter-->
          <div class="col-md-3 md-margin-bottom-40">
            <div class="headline">
              <h2>
                Twitter
              </h2>
            </div>
            <address class="md-margin-bottom-40">
              <table>
                <tbody>
                <tr>
                  <td>
                    <i class="fa fa-twitter-square"></i>
                  </td>

                  <td>
                    <a href="https://twitter.com/Tronfoundation" target="_blank">{{$t('footer.twitter.of')}}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i class="fa fa-twitter-square"></i>
                  </td>
                  <td>
                    <a href="https://twitter.com/justinsuntron" target="_blank">{{$t('footer.twitter.js')}}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i class="fa fa-twitter-square"></i>
                  </td>
                  <td>
                    <a href="https://twitter.com/TronKR" target="_blank">{{$t('footer.twitter.kr')}}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i class="fa fa-twitter-square"></i>
                  </td>
                  <td>
                    <a href="https://twitter.com/TronRussia" target="_blank">{{$t('footer.twitter.ru')}}</a>
                  </td>
                </tr>
                </tbody>
              </table>
            </address>
          </div>
          <div class="col-md-3 md-margin-bottom-40">
            <div class="headline">
              <h2>
                {{$t('footer.miscTitle')}}
              </h2>
            </div>
            <address class="md-margin-bottom-40">
              <table>
                <tbody>
                <tr>
                  <td>
                    <i class="fa fa-weibo"></i>
                  </td>
                  <td>
                    <a href="https://weibo.com/shixb90?refer_flag=1005055014_" target="_blank">{{$t('footer.misc.weibo')}}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i class="fa fa-facebook"></i>
                  </td>
                  <td>
                    <a href="https://www.facebook.com/tronfoundation" target="_blank">{{$t('footer.misc.fb')}}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i class="fa fa-slack"></i>
                  </td>
                  <td>
                    <a href="https://tronfoundation.slack.com/" target="_blank">{{$t('footer.misc.slack')}}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i class="fa fa-question-circle"></i>
                  </td>
                  <td>
                    <a href="https://tron.network/faq.html" target="_blank">FAQ</a>
                  </td>
                </tr>
                </tbody>
              </table>
            </address>
          </div>

        </div>
      </div>
    </div>
    <div class="copyright">
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <p>Copyright©2017-2018
              <a>TRON Foundation 波场</a><a>（TRON）官方网站版权所有</a>
              <span class="copyright-span">{{$t('footer.note2')}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="scss" scoped>

  h2 {
    line-height: 33px;
  }

  a:hover, a:active, a:visited, a:link {
    text-decoration: none;
  }

  .col-md-8 .p {
    font-family: 'Open Sans', sans-serif;
    font-size: 11px;
    color: #C0C0C0 !important;
  }

  .copyright-span {
    padding-left: 0;
    padding-top: 10px;
    display: block;
  }

  .map-img p {
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    color: #C0C0C0 !important;
    padding: 0 20px;
  }

  .footer, .copyright {
    background: #192330;
  }

  .footer-logo {
    display: block;
    margin: 17px auto 20px auto;
    padding-right: 20px;
    height: 81px;
  }

  .headline {
    display: block;
    margin: 30px 0 25px;
    border-bottom: 1px dotted #e4e9f0;
    .fa-weixin {
      color: #83d944;
    }
    .fa-qq {
      color: #1991ed;
    }
    .fa-telegram {
      color: #fff;
    }
    .fa-twitter {
      color: #1da1f3;
    }
    .fa-circle-o-notch{
      color: #37bc9b;
    }
  }

  .headline h2, .headline h3, .headline h4 {
    margin: 0 0 -2px;
    padding-bottom: 5px;
    display: inline-block;
  }

  .pull-right {
    color: #C0C0C0;
    margin-top: 8px;
  }

  .link-list li:first-child {
    border-top: 0 !important;
  }

  .link-list a {
    font-size: 12px;
    padding: 6px 0;
    display: inline-block;
  }

  .link-list li i {
    float: right;
    margin-top: 10px;
  }


  .footer a{
    padding-left: 5px;
  }


  @media (min-width: 768px) {
    .copyright-span {
      padding-left: 0;
      padding-top: 10px;
      display: block;
    }
  }

  @media (min-width: 992px) {
    .col-md-3 {
      width: 20%;
    }
    .col-md-8 {
      width: 100%;
    }
    .copyright-span {
      padding-left: 9px;
      padding-top: 0;
      display: inline-block;
    }
  }


</style>
