const superagent = require ('superagent');
const cheerio = require ('cheerio');
const fs = require ('fs');

// 请求地址
const reptileUrl = "https://coinmarketcap.com/currencies/tron/historical-data/?start=20180426&end=20180502";

/**
 * 处理空格和回车
 * @param text
 * @returns {string}
 */
function replaceText (text) {
  return text.replace (/\n/g, "").replace (/\s/g, "");
}

/**
 * 存放数据容器
 * @type {Array}
 */
let data = [];

function getClose () {
  // 获取数据
  superagent.get (reptileUrl).end (function (err, res) {
    // 抛错拦截
    if (err) {
      console.log (err);
      return;
    }
    /**
     * res.text 包含未解析前的响应内容
     * 我们通过cheerio的load方法解析整个文档，就是html页面所有内容，可以通过console.log($.html());在控制台查看
     */
    let $ = cheerio.load (res.text);
    $ ('#historical-data .table-responsive table tbody .text-right').each (function (i, elem) {
      // 拿到当前li标签下所有的内容，开始干活了
      let _this = $ (elem);
      data.push ({
        close: replaceText (_this.find ('td').eq (4).text ())
      })
    });

    if (data.length) {
      fs.unlink ('data.json', function (err) {
        if (err){
          return
        };
        console.log ('删除成功')
      });
      // 生成数据
      // 写入数据, 文件不存在会自动创建
      fs.writeFile ('data.json', JSON.stringify ({
        status: 0,
        data: data
      }), function (err) {
        if (err) throw err;
        console.log ('写入完成');
      });
    }
  });
}

module.exports = getClose;
