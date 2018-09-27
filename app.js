var users = new Map();  // 紀錄進入 Beacon 範圍的使用者

// Application Log
var log4js = require('log4js');
var log4js_extend = require('log4js-extend');
log4js_extend(log4js, {
    path: __dirname,
    format: '(@file:@line:@column)'
});
log4js.configure(__dirname + '/log4js.json');
var logger = log4js.getLogger('bot');
var logger_line_message = log4js.getLogger('line_message');
var logger_line_mongodb = log4js.getLogger('line_mongodb');

// 連接 mongodb
var linemongodb = require('./linemongodb');
var linedb = new linemongodb.linemongodb(logger_line_mongodb);

// line message api
var linemessageapi = require('./linemessage');
var linemessage = new linemessageapi.linemessage(logger_line_message);

// 建立 express service
var express = require('express');
var app = express();
var port = process.env.PORT || 443;
var http = require('https');
var server = http.Server(app).listen(port);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// 讀取組態表
var fs = require('fs');
var config = fs.readFileSync(__dirname + '/config.json', 'utf8');
config = JSON.parse(config);

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next();
});

app.get('/api', function (request, response) {
    response.send('API is running');
});

app.use(express.static('pages'));

// 接收來自 LINE 傳送的訊息
app.post('/', function (request, response) {
  try {
      var results = request.body.events;
      logger.info(JSON.stringify(results));
      logger.info('receive message count: ' + results.length);
      for (var idx = 0; idx < results.length; idx++) {
          var acct = results[idx].source.userId;
          var reply_token = results[idx].replyToken;
          logger.info('reply token: ' + results[idx].replyToken);
          logger.info('createdTime: ' + results[idx].timestamp);
          logger.info('from: ' + results[idx].source.userId);
          logger.info('type: ' + results[idx].type);
          if (results[idx].type == 'beacon') {    // 接收到使用者的 Beacon 事件
              logger.info('source: ' + JSON.stringify(results[idx].source));
              logger.info('beacon: ' + JSON.stringify(results[idx].beacon));
              logger.info('beacon type: ' + results[idx].beacon.type);
              if (results[idx].beacon.type == 'enter') {  // 進入 Beacon 範圍
                  if (results[idx].beacon.hwid == config.entry_beacon_hwid) { // 進入指定的 Beacon
                      if (users.has(acct)) {
                          var user = users.get(acct);
                          user.id = results[idx].source.userId;
                          user.enter_time = new Date();
                          user.beacon_id = results[idx].beacon.hwid;
                      } else {
                          linemessage.GetProfile(acct, function (user) {
                              user.id = user.userId;
                              user.enter_time = new Date();
                              user.beacon_id = this.beacon_id;
                              users.set(user.userId, user);
                          }.bind({ beacon_id: results[idx].beacon.hwid }));
                      }
                  } else if (results[idx].beacon.hwid == config.leave_beacon_hwid) { // 進入指定為離開的 Beacon
                      if (users.has(acct)) {
                          users.delete(acct);
                      }
                  }
              }
          } else if (results[idx].type == 'message') {
          }
      }
  } catch (e) {
  }
});