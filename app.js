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
var logger_line_LIFF = log4js.getLogger('line_LIFF');

// 連接 mongodb
var linemongodb = require('./linemongodb');
var linedb = new linemongodb.linemongodb();

// line Message API
var linemessageapi = require('./linemessage');
var linemessage = new linemessageapi.linemessage(logger_line_message);

// line LIFF API
var lineliffapi = require('./lineliff');
var lineliff = new lineliffapi.lineliff(logger_line_LIFF);

// 建立 express service
var express = require('express');
var app = express();
var port = process.env.PORT || 443;
var http = require('http');
var server = http.Server(app).listen(port);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static('public'));

// 讀取組態表
var fs = require('fs');
var config = fs.readFileSync(__dirname + '/config.json', 'utf8');
config = JSON.parse(config);

function user() {
    this.name = '';
    this.userid = '';
    this.image = '';
    this.location = [];
}

function location() {
    this.name = '';
    this.locationid = '';
    this.user = [];
}

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next();
});

app.get('/api', function (request, response) {
    response.send('API is running');
});

app.get('/index', function (request, response) {
    request.header("Content-Type", 'text/html');
    fs.readFile(__dirname + '/pages/index.html', 'utf8', function (err, data) {
        if (err) {
            res.send(err);
        }
        this.res.send(data);
    }.bind({ req: request, res: response }));
});

app.get('/getbackgrounds', function (request, response) {
    request.header("Content-Type", 'image/jpeg');
    fs.readFile(__dirname + '/pages/assets/img/backgrounds/1.jpg', 'utf8', function (err, data) {
        if (err) {
            res.send(err);
        }
        this.res.send(data);
    }.bind({ req: request, res: response }));
});

app.get('/api/liff', function (request, response) {
    lineliff.GetAllLIFF(function (result) {
        if (result) response.send(result);
        else response.send(false);
    });
});

app.post('/api/liff', function (request, response) {
    var url = request.body.url;
    lineliff.AddLIFF(url, function (result) {
        if (result) response.send(result);
        else response.send(false);
    });
});

app.put('/api/liff', function (request, response) {
    var LIFF_ID = request.body.liff;
    var url = request.body.url;
    lineliff.UpdateLIFF(LIFF_ID, url, function (result) {
        if (result) response.send(true);
        else response.send(false);
    });
});

app.delete('/api/liff/:liff', function (request, response) {
    var LIFF_ID = request.params.liff;
    lineliff.DeleteLIFF(LIFF_ID, function (result) {
        if (result) response.send(true);
        else response.send(false);
    });
});

app.post('/api/beacon', function (request, response) {
    var beacon = new location();
    beacon.name = request.body.name;
    beacon.locationid = request.body.beacon_id;
    linedb.create_location(beacon, function (err, hosts) {
        if (err) {
            logger.info('create beacon fail: ' + err);
            response.send('create beacon fail: ' + err);
        }
        logger.info('create beacon success');
        response.send(hosts);
    });
});

app.post('/api/shungjiou', function (request, response) {

});

app.use(express.static('pages'));

// 接收來自 LINE 傳送的訊息
app.post('/', function (request, response) {
    logger.info("POST /");
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
            if (results[idx].type == 'follow') {
                FollowEvent(acct);
            }
            else if (results[idx].type == 'beacon') {    // 接收到使用者的 Beacon 事件
                BeanconEvent(results[idx]);
            } else if (results[idx].type == 'message') {
            }
        }
    } catch (e) {
    }
    response.send('');
});

function FollowEvent(acct) {
    logger.info('----------[Follow]---------');
    var new_user = new user();
    linemessage.GetProfile(acct, function (user) {
        this.new_user.name = user.displayName;
        this.new_user.userid = user.userId;
        this.new_user.image = user.pictureUrl;
        linedb.create_user(this.new_user, function (err) {
            if (err) logger.error('fail' + err);
            else logger.info('success');
        });
    }.bind({ new_user: new_user }));
}

function BeanconEvent(event) {
    logger.info('----------[Beacon]---------');
    logger.info('source: ' + JSON.stringify(event.source));
    logger.info('beacon: ' + JSON.stringify(event.beacon));
    logger.info('beacon type: ' + event.beacon.type);
    switch (event.beacon.type) {
        case "enter":
            var update_user = new user();
            linemessage.GetProfile(event.source.userId, function (user) {
                this.update_user.name = user.displayName;
                this.update_user.userid = user.userId;
                this.update_user.image = user.pictureUrl;
                this.update_user.location.push(event.beacon.hwid);
                linedb.set_userbyuserid(this.update_user.userid,this.update_user, function (err) {
                    if (err) logger.error('fail' + err);
                    else logger.info('success');
                });
            }.bind({ update_user: update_user }));
            linedb.enter_usertolocation(event.source.userId, event.beacon.hwid, function (err) {
                if (err) logger.error(err);
            });
            break;
    }
}