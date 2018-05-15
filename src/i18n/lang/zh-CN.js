export default {
  base: {
    loading: "载入中...",
    cancel: "取消",
    submit: "提交",
    close: "关闭",
    confirm: "确认",
    instruction: "说明",
  },
  nav: {
    home: "主页",
    network: "网络",
    nodes: "节点",
    delegates: "超级代表",
    token: "代币",
    view: "查看",
    create: "新建",
    accounts: "地址",
    blocks: "区块",
    blockDetail: "区块详情",
    wallet: "钱包",
    apply: "申请成为超级代表",
    balance: "余额",
    send: "发送TRX",
    receive: "接收TRX",
    error: '出错了',
    signOut: "注销",
    login: "登陆",
    registration: "注册"
  },
  footer: {
    note: "波场TRON以推动互联网去中心化为己任，致力于为去中心化互联网搭建基础设施。",
    note2: "请大家注意假冒官方账户，更多信息请关注官方消息渠道！",
    miscTitle: "其他",
    tel: {
      cn: "中文Telegram",
      en: "英文Telegram",
      kr: "韩文Telegram",
      ru: "俄文Telegram",
      us: "美国地区Telegram",
    },
    twitter: {
      of: "波场TRON官方Twitter",
      js: "孙宇晨个人Twitter",
      kr: "波场TRON韩国官方Twitter",
      ru: "波场TRON俄罗斯官方Twitter",
    },
    misc: {
      weibo: "微博",
      fb: "Facebook",
      slack: "Slack"
    }
  },
  indexBrief: {
    price: "TRX价格",
    usd: "美元",
    randv: "超级代表数/最高得票",
    rank: "排名",
    height: "区块高度",
    holders: "TRX持有者",
    cap: "市场总量",
    billion: "亿美元"
  },
  lineChart: {
    title: "TRX 7日价格",
    yTitle: "美元($)",
    xName: "价格"
  },
  pieChart: {
    title: "TRX 超级代表得票率",
    seriesName: "得票",
  },
  indexBlock: {
    name: "区块",
    all: "查看全部",
  },
  blockList: {
    height: "高度",
    age: "产生时间",
    witness: "确认者",
    size: "大小",
    transactions: "交易数量"
  },
  blockDetail: {
    height: "高度",
    parenthash: "父区块哈希",
    basic: "基本信息",
    main: "(主链)",
    age: "生成时间",
    witness: "确认者",
    size: "大小",
    transactions: "交易详情",
    count: "笔",
    confirm: "确认",
  },
  delegateList: {
    name: "名称 (点击投票)",
    addr: "地址",
    lastBlock: "最新区块",
    blockProduced: "产生区块数",
    blockMissed: "丢失区块数",
    votes: "获得投票数",
    dialog: {
      title1: "您有",
      title2: "票，请问您想投多少票给",
      ins: "使用您的TRX投票给超级代表。 对于您在帐户中持有的每个TRX，您都有一次投票权。 TRX不会被使用。 只要你愿意，你可以多次为多位代表投票。 最后的选票将在24点结束，代表名单将更新。"
    }
  },
  nodes: {
    mapTitle: "TRON在线节点",
    region: "地区",
    nodes: "节点数",
  },
  tokens: {
    name: "名称",
    addr: "地址",
    supply: "总量",
    time: "开始/结束时间",
    parti: "参与",
    collapse: {
      desc: "名称",
      price: "价格",
      quantity: "数量",
      msg1: "我确认将花费",
      msg2: "用于此代币的ICO，并将啊得到总共",
      msg3: "数量的次代笔。"
    },
    create: {
      title: "发行 Token",
      detail: "详情",
      name: "Token 名称",
      supply: "Token 总量",
      supplyalert: "总量必须大于0",
      supplymsg: "将流通的Token总量",
      desc: "描述",
      descalert: "说明是必填项",
      descmsg: "对token目的的简短描述",
      url: "URL",
      urlalert: "url格式错误",
      urlmsg: "用户可以在其中找到有关token的更多信息的网站",
      rate: "汇率",
      ratemsg1: "通过定义参与者每消费一个TRX会获得多少令牌，来指定单个令牌的价格。",
      ratemsg2: "参与者将会得倒 ",
      ratemsg3: "（每提供 ",
      ratemsg4: "TRX）",
      trxaxmount: "TRX 数量",
      trxaxmountalert: "TRX 数量必须大于0",
      tokenamount: "Token 数量",
      tokenamountalert: "Token 数量必须大于0",
      tokenprice1: "Token 价格",
      tokenprice2: "TRX",
      part: "参与",
      partmsg: "指定代币发行的参与时间，在参与期间，用户可以用TRX来购买",
      startdate: "开始时间",
      startdatemsg: "开始时间必须晚于当前时间",
      enddate: "结束时间",
      enddatemsg: "结束时间必须晚于当前时间",
      confirmmsg: "我确认创建令牌的总供应量需要支付1024 TRX的一次性总费用。",
      issue: "发行token",
      inst: "指南",
      inst1: "在Tron协议上发布令牌可以由任何帐户中至少有1024 TRX的人完成。",
      inst2: "当令牌发布时，它将显示在令牌概览页面上。 然后，用户可以在参与期内参与其交换TRX的令牌。",
      inst3: "在发布令牌后，您的账户将获得相当于总供应量的令牌数量。 当其他用户将他们的TRX换成代币时，代币将从您的账户中提取，您将收到等于指定汇率的TRX。",
    }
  },
  accounts: {
    addr: "地址",
    balance: "账户余额",
  },
  wallet: {
    nav: {
      account: "账户",
      overview: "概览",
      apply: "申请成为超级代表",
      tokens: "资产",
      balance: "资产",
      trans: "交易",
      send: "发送",
      receive: "接受",
      alert: "请勿交易提醒",
      alertContent: "这是一个测试网，不要从您自己的钱包中发送任何TRX或交换本网站的任何地址！"
    },
    account: {
      overview: "概览",
      aoverview: "账户概览.",
      yourAddr: "您的账户地址",
      alert: "(请勿将TRX从您自己的钱包中发送或交换到testnet的上述帐户地址！)",
    },
    apply: {
      title: "申请成为超级代表",
      msg1: "TRX持有人可以通过使用账户管理功能申请成为超级代表，并为候选人投票。 每个帐户都可以更新当前的选民信息，也可以为多名候选人投票。",
      msg2: "最大投票数小于或等于TRX用户每次持有的数量。 （如果您有TRX的一定数额，您可以投票少于或等于一定数量的投票）。",
      msg3: "投票结果将根据每个投票周期中每个账户的最终选民信息计算，其时间为00:00至24:00。 拥有最多选票的TRX持有者将成为超级代表。",
      msg4: "每个在网络中进行的交易都需要所有的SuperDelegates进行验证，并且会获得一些奖金。 TRX不会在超级代表申请和投票过程中消耗。",
      addrTitle: "您的个人网站地址",
      confirmMsg: "我确认创建令牌的总供应量需要支付1024 TRX的一次性总费用。",
    },
    balance: {
      title: "我的资产",
      name: "名称",
      balance: "余额",
      frozen: {
        title: "冻结TRX",
        amount: "数量",
        exp: "过期日期",
        msg: 'TRX可以被冻结/锁定以启用其他功能。 例如，对于您的冻结TRX，您可以为超级代表投票。 冻结的令牌被“锁定”3天。 在此期间冻结的TRX不能交易。 这段时间过后，您可以解冻TRX并交易代币。',
        btnfreeze: "冻结",
        btnunfreeze: "解冻",
        freezedialog: {
          title: "冻结余额",
          amount: "TRX金额",
          msg1: "我确认冻结 ",
          msg2: " TRX至少3天",
        },
        unfreezedialog: {
          title: "解冻余额",
          msg: "你确定要解冻TRX吗？"
        }
      },
      testnet: {
        title: "测试网络",
        msg: "当请求TRX时，您将收到10000 TRX，您可以在测试网上使用它进行测试。 您只能为每个帐户申请TRX一次。",
        btn: "请求TRX进行测试"
      }
    },
    send: {
      title: "发送 TRX",
      recvAddr: "接受者地址",
      type: "代币类型",
      selectMsg: "请选择一个",
      amount: "数量",
      checkMsg: "只输入有效的TRON钱包地址。 不正确的地址可能会导致TRX丢失。",
    },
    recv: {
      title: "接收",
      scan: "用QR码扫描器扫描代码"
    }
  },
  error: {
    back: "返回主页",
    login: "登陆",
    defaultMsg: "抱歉! <br>我们遇到了意外的错误。<br>请稍后再试",
    loginMsg: "抱歉! <br>您无法访问此页面。<br>请先登录！",
    blockNumberMsg: "出错了!<br>区块号太大",
  },
  login: {
    title: "登陆您的钱包账户",
    remember: "记住我",
    login: "登陆",
    noAccount: "没有账号?",
    noAccountMsg1: "没关系,",
    noAccountMsg2: "点击这里",
    noAccountMsg3: "注册新账号.",
  },
  register: {
    title: "注册一个新帐户",
    loginMsg1: "已经注册？点击",
    loginMsg2: "这里",
    loginMsg3: "来登录您的帐户。",
    addr: "帐户地址",
    prikey: "私钥",
    regenerate: "重新生成",
    check1: "我明白如果我忘记/丢失密码，我将永远无法访问我的资产",
    check2: "我明白如果我忘记/丢失密码，没有人能够帮助我恢复它",
    submit: "提交",
  }
}