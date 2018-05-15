export default {
  base: {
    loading: "loading...",
    cancel: "Cacnel",
    submit: "Submit",
    close: "Close",
    confirm: "Confirm",
    instruction : "Instruction",
  },
  nav:{
    home: "Home",
    network: "Network",
    nodes: "Nodes",
    delegates: "Delegates",
    token: "Token",
    view: "View",
    create: "Create",
    accounts: "Accounts",
    blocks: "Blocks",
    blockDetail: "Block Detail",
    wallet: "Wallet",
    apply: "Apply",
    balance: "Balance",
    send: "Send TRX",
    receive: "Receive TRX",
    error: 'Error',
    signOut: "Sign Out",
    login: "Login",
    registration: "Registration"
  },
  footer: {
    note: "TRON is an ambitious project dedicated to building the infrastructure for a truly decentralized Internet.",
    note2: "Please don't trust fake accounts. For more info, please follow our official channels!",
    miscTitle: "MISC",
    tel: {
      cn: "Telegram Chinese Group",
      en: "Telegram English Group",
      kr: "Telegram Korea Group",
      ru: "Telegram Russia Group",
      us: "Telegram American Group",
    },
    twitter: {
      of: "TRON official account",
      js: "Justin Sun's account",
      kr: "TRON Korea official account",
      ru: "TRON Russia official account",
    },
    misc: {
      weibo: "weibo",
      fb: "Facebook",
      slack: "Slack"
    }
  },
  indexBrief: {
    price: "TRX Price",
    usd: "USD",
    randv: "Representatives / Most votes",
    rank: "Rank",
    height: "Block Height",
    holders: "TRX holders",
    cap: "Market CAP OF",
    billion: "Billion"
  },
  lineChart: {
    title: "TRX 7 day price history",
    yTitle: "USD($)",
    xName: "Price"
  },
  pieChart: {
    title: "TRX Representatives Vote Share",
    seriesName: "Votes",
  },
  indexBlock: {
    name: "Blocks",
    all: "View All",
  },
  blockList: {
    height: "Height",
    age: "Age",
    witness: "Witness",
    size: "Size",
    transactions: "Transactions"
  },
  blockDetail: {
    height: "Height",
    parenthash: "Parenthash",
    basic: "Basic Information",
    main: "(Main Chain)",
    age: "Age",
    witness: "Witness",
    size: "Size",
    transactions: "Transaction details",
    count: "Transactions",
    confirm: "Comfirms",
  },
  delegateList: {
    name: "Name (click to vote)",
    addr: "Address",
    lastBlock: "Last block",
    blockProduced: "Blocks Produced",
    blockMissed: "Blocks Missed",
    votes: "Votes",
    dialog: {
      title1: "You have",
      title2: "Votes remaining, how much you want to vote for",
      ins: "Use your TRX to vote for Super Representatives. For every TRX you hold in your account you have one vote to spend. TRX will not be consumed. You can vote as many times for the several representatives as you like. The final votes will be tallied at 24 o'clock and the list of delegates will be updated."
    }
  },
  nodes: {
    mapTitle: "TRON ACTIVE NODES",
    region: "Region",
    nodes: "Nodes",
  },
  tokens: {
    name: "Name",
    addr: "Address",
    supply: "Total Supply",
    time: "Start / End Time",
    parti: "Participate",
    collapse: {
      desc: "Description",
      price: "Price",
      quantity: "Quantity",
      msg1: "I confirm that I will spend",
      msg2: "In this distribution of tokens and I will get a total of",
      msg3: "tokens."
    },
    create: {
      title: "Issue a Token",
      detail: "Details",
      name: "Token Name",
      supply: "Token Supply",
      supplyalert: "The total supply must be at least 1.",
      supplymsg: "Total amount of tokens which will be in circulation",
      desc: "Description",
      descalert: "The Description field is required.",
      descmsg: "A short description of the purpose of the token",
      url: "URL",
      urlalert: "The url format is invalid",
      urlmsg: "A website where users can find more information about the token",
      rate: "Exchange Rate",
      ratemsg1: "Specify the price of a single token by defining how many tokens a participant will receive for every TRX they spend.",
      ratemsg2: "Participants will receive ",
      ratemsg3: "for every ",
      ratemsg4: "TRX",
      trxaxmount: "TRX Amount",
      trxaxmountalert: "The TRXamount must be at least 1.",
      tokenamount: "Token Amount",
      tokenamountalert: "The tokenamount must be at least 1.",
      tokenprice1: "Token Price",
      tokenprice2: "TRX",
      part: "Participation",
      partmsg: "Specify the participation period in which tokens will be issued. During the participation period users can exchange TRX for ",
      startdate: "Start Date",
      startdatemsg: "Start Date can not be earlier than current.",
      enddate: "End Date",
      enddatemsg: "End Date can not be earlier than current.",
      confirmmsg: "I confirm that creating the total supply of the token costs a one time total fee of 1024 TRX.",
      issue: "Issue Token",
      inst: "Instruction",
      inst1: "Issuing a token on the Tron Protocol can be done by anyone who has at least 1024 TRX in their account.",
      inst2: "When a token is issued it will be shown on the token overview page. Users can then participate within the participation period and exchange their TRX for tokens.",
      inst3: "After issuing the token your account will receive the amount of tokens equal to the total supply. When other users exchange their TRX for tokens then the tokens will be withdrawn from your account and you will receive TRX equal to the specified exchange rate.",
    }
  },
  accounts: {
    addr: "Address",
    balance: "Balance",
  },
  wallet: {
    nav: {
      account: "Account",
      overview: "Overview",
      apply: "Apply For Delegate",
      tokens: "Tokens",
      balance: "Balance",
      trans: "Transactions",
      send: "Send",
      receive: "Receive",
      alert: "No Real Transaction Alerts",
      alertContent: "This is a testnet, do not send any TRX from your own wallet or exchange to any address of this website!"
    },
    account: {
      overview: "Overview",
      aoverview: "Account Overview.",
      yourAddr: "Your Address",
      alert: "(Do not send TRX from your own wallet or exchange to the above account address of testnet!)",
    },
    apply: {
      title: "Apply For Delegate",
      msg1: "TRX holders can apply to become a super delegate by using the account management function, and vote for candidates. Each account can update current voter information and also is allowed to vote for multiple candidates.",
      msg2: "The maximum number of votes is less than or equal to the number of TRX users hold each time. (If you have certain sum of TRX, you can vote less than or equal to certain number of votes).",
      msg3: "The result of votes will be calculated based on the final voter information of every account in each voting cycle of which the time is from 00:00 to 24:00. TRX holders with the most votes will become super delegate.",
      msg4: "Every transaction made in the network is required to be validated by all SuperDelegates, and some bonuses will be getted. TRX will not be consumed in the process of super delegate application and voting.",
      addrTitle: "Your personal website address",
      confirmMsg: "I confirm that creating the total supply of the token costs a one time total fee of 1024 TRX.",
    },
    balance: {
      title: "Token Balances",
      name: "Name",
      balance: "Balance",
      frozen: {
        title: "Frozen TRX",
        amount: "Amount",
        exp: "Expires",
        msg: 'TRX can be frozen/locked to enable additional features. For example, with your frozen TRX you can vote for super delegates. Frozen tokens are "locked" for a period of 3 days. During this period the frozen TRX cannot be traded. After this period you can unfreeze the TRX and trade the tokens.',
        btnfreeze: "Freeze",
        btnunfreeze: "Unfreeze",
        freezedialog: {
          title: "Freeze Balance",
          amount: "TRX Amount",
          msg1: "I confirm to freeze ",
          msg2: " TRX for at least of 3 days",
        },
        unfreezedialog: {
          title: "Unfreeze Balance",
          msg: "Are you sure you want to unfreeze TRX?"
        }
      },
      testnet: {
        title: "Testnet",
        msg: "When requesting TRX you will receive 10000 TRX which you can use for testing on the testnet. You may only request TRX once per account.",
        btn: "Request TRX for testing"
      }
    },
    send: {
      title: "Send TRX",
      recvAddr: "Receiver Address",
      type: "Token Type",
      selectMsg: "Please select one",
      amount: "Amount",
      checkMsg: "Only enter valid TRON wallet address. Incorrect addresses can lead to TRX loss.",
    },
    recv: {
      title: "Receive",
      scan: "Scan the code with a QR Code scanner"
    }
  },
  error: {
    back: "Back Home",
    login: "login",
    defaultMsg: "Sorry! <br>We encountered an unexpected error.<br>Please try back again shortly",
    loginMsg: "Sorry! <br>You can't visit this page.<br>Please login first!",
    blockNumberMsg: "Error! <br>Block Number Too Large",
  },
  login: {
    title: "Login to your account",
    remember: "Remember",
    login: "Login",
    noAccount: "Have no account?",
    noAccountMsg1: "No worries,",
    noAccountMsg2: "Click Here",
    noAccountMsg3: "to register a NEW account.",
  },
  register: {
    title: "Register a new account",
    loginMsg1: "Already Signed Up? Click",
    loginMsg2: "Sign In",
    loginMsg3: "to login your account.",
    addr: "Account Address",
    prikey: "Private Key",
    regenerate: "Regenerate",
    check1: "I understand that if I forget/lose my password I will never be able to access my assets",
    check2: "I understand that if I forget/lose my password no one will be able to help me recover it",
    submit: "Submit",
  }
}