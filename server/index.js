const fs = require ('fs');
const path = require ('path');
const express = require ('express');
const getClose = require ('./reptile');
const schedule = require ('node-schedule');
const app = express ();


let rule = new schedule.RecurrenceRule ();
rule.hour = 0;
rule.minute = 0;
rule.second = 0;

fs.exists('data.json', function (exists) {
  if (!exists) {
    getClose()
  }
});

// 定时任务每天0点执行
schedule.scheduleJob (rule, function () {
  getClose()
});

// 监听端口
app.listen (3001);
console.log ('success listen at port.....');
