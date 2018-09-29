var users = new Map();  // 紀錄進入 Beacon 範圍的使用者
var tentative_activity = new Map();

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
var logger_line_RichMenu = log4js.getLogger('line_RichMenu');

// 連接 mongodb
var linemongodb = require('./linemongodb');
var linedb = new linemongodb.linemongodb();

// line Message API
var linemessageapi = require('./linemessage');
var linemessage = new linemessageapi.linemessage(logger_line_message);

// line LIFF API
var lineliffapi = require('./lineliff');
var lineliff = new lineliffapi.lineliff(logger_line_LIFF);

//line Flex API
var lineflexapi = require('./lineflex');
var lineflex = new lineflexapi.lineflex();

var linerichmenuapi = require('./linerichmenu');
var linerichmenu = new linerichmenuapi.linerichmenu(logger_line_RichMenu);

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
    this.pushenable = true;
}

function location() {
    this.name = '';
    this.locationid = '';
    this.user = [];
    this.latitude = '';
    this.longitude = '';
}

function shuangjiou() {
    this.name = '';
    this.description = '';
    this.starttime = '';
    this.endtime = '';
    this.type = '';
    this.host = '';
    this.location = '';
    this.latitude = '';
    this.longitude = '';
    this.number = '';
    this.participant = [];
    this.shuangjiouid = '';
}

function host() {
    this.shuangjiouid = '';
    this.name = '';
    this.userid = '';
    this.gender = '';
    this.clothes = '';
    this.hat = '';
    this.location = '';
}

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next();
});

app.get('/api', function(request, response) {
    response.send('API is running');
});

app.get('/api/richmenulist', function(request, response) {
    linerichmenu.GetAllRichMenu(function(result) {
        if (result) response.send(result);
        else response.send(false);
    });
});

app.get('/api/richmenu/:richmenuid', function(request, response) {
    var richmenuid = request.params.richmenuid;
    linerichmenu.GetRichMenu(richmenuid, function(result) {
        if (result) response.send(result);
        else response.send(false);
    });
});

app.post('/api/richmenu', function(request, response) {
    var richmenu = request.body.richmenu;
    linerichmenu.CreateRichMenu(richmenu, function(result) {
        if (result) response.send(result);
        else response.send(false);
    });
});

app.get('/api/richmenulist', function(request, response) {
    linerichmenu.GetAllRichMenu(function(result) {
        if (result) response.send(result);
        else response.send(false);
    });
});

app.get('/api/richmenu/:richmenuid', function(request, response) {
    var richmenuid = request.params.richmenuid;
    linerichmenu.GetRichMenu(richmenuid, function(result) {
        if (result) response.send(result);
        else response.send(false);
    });
});

app.post('/api/richmenu', function(request, response) {
    var richmenu = request.body.richmenu;
    linerichmenu.CreateRichMenu(richmenu, function(result) {
        if (result) response.send(result);
        else response.send(false);
    });
});

app.delete('/api/richmenu/:richmenu', function(request, response) {
    var richmuneId = request.params.richmenuid;
    linerichmenu.DeleteRichMenu(richmuneId, function(result) {
        if (result) response.send(true);
        else response.send(false);
    });
});

app.put('/api/richmenu/defaultrichmenu', function(request, response) {
    var richmenuId = request.body.richmenuid;
    linerichmenu.SetDefaultRichMenu(richmenuId, function(result) {
        if (result) response.send(true);
        else response.send(false);
    });
});

app.put('/api/richmenu/link', function(request, response) {
    var userId = request.body.userid;
    var richmenuId = request.body.richmenuid;
    linerichmenu.LinkRichMenuToUser(userId, richmenuId, function(result) {
        if (result) response.send(true);
        else response.send(false);
    });
});

app.get('/api/liff', function(request, response) {
    lineliff.GetAllLIFF(function(result) {
        if (result) response.send(result);
        else response.send(false);
    });
});

app.post('/api/liff', function(request, response) {
    var url = request.body.url;
    lineliff.AddLIFF(url, function(result) {
        if (result) response.send(result);
        else response.send(false);
    });
});

app.put('/api/liff', function(request, response) {
    var LIFF_ID = request.body.liff;
    var url = request.body.url;
    lineliff.UpdateLIFF(LIFF_ID, url, function(result) {
        if (result) response.send(true);
        else response.send(false);
    });
});

app.delete('/api/liff/:liff', function(request, response) {
    var LIFF_ID = request.params.liff;
    lineliff.DeleteLIFF(LIFF_ID, function(result) {
        if (result) response.send(true);
        else response.send(false);
    });
});

app.post('/api/beacon', function(request, response) {
    var beacon = new location();
    beacon.name = request.body.name;
    beacon.locationid = request.body.beacon_id;
    linedb.create_location(beacon, function(err, hosts) {
        if (err) {
            logger.info('create beacon fail: ' + err);
            response.send('create beacon fail: ' + err);
        }
        logger.info('create beacon success');
        response.send(hosts);
    });
});

app.post('/api/shungjiou', function(request, response) {
    logger.info('POST /api/shungjiou');
    logger.info(JSON.stringify(request.body));
    var data = request.body;
    data.host.userId = data.host.userId.replace('\"', '').replace('\"', '');
    if (tentative_activity.has(data.host.userId)) {
        var activity = tentative_activity.get(data.host.userId);
        activity.name = data.shuangjiou.name;
        activity.description = data.shuangjiou.description;
        activity.starttime = Date.now();
        activity.endtime = new Date(data.shuangjiou.endtime);
        activity.type = data.shuangjiou.type;
        activity.host = data.host.userId;
        activity.number = data.shuangjiou.number;
        tentative_activity.delete(data.host.userId);
        linedb.create_shuangjiou(activity, function(err) {
            if (err)
                logger.error('fail: ' + err);
            else
                logger.info('success');
        });

        var organiser = new host();

        organiser.name = data.host.name;
        organiser.userid = data.host.userId;
        organiser.gender = data.host.gender;
        organiser.clothes = data.host.clothes;
        organiser.hat = data.host.hat;
        organiser.shuangjiouid = activity.shuangjiouid;
        linedb.create_host(organiser, function(err) {
            if (err)
                logger.error('fail: ' + err);
            else
                logger.info('success');
        });
        var buttons = [
            {
                "type": "uri",
                "label": "查看成員",
                "uri": "line://app/1610735667-3E0z5w6a"
            }
        ]
        linemessage.SendButtons(data.host.userId, "您的活動已建立，可以點選以下按鈕查看參加者", buttons, "This is a button", "linehack2018", "", function(result) {
            if (!result) logger.error(result);
            else logger.info(result);
        });
        response.send('200');
    }
});

app.post('/api/guest', function(request, response) {
    var userId = request.body.userId;
    linedb.get_shuangjioubyhost(userId, function(err, host) {
        var data = [];
        if (err) {
            logger.info('fail: ' + err);
            this.res.send(err);
        }
        else {
            logger.info('success');
            for (var index = 0; index < host.participant.length; index++) { //有問題
                linedb.get_userbyuserid(host.participant[index], function(err, user) {
                    if (err) {
                        logger.info('fail: ' + err);
                    }
                    else {
                        logger.info('success');
                        this.data.push(user);
                    }
                }.bind({ data: data }));
            }
            this.res.send(data);
        }
    }.bind({ res: response }));
});

app.use(express.static('pages'));
app.get('/index', function(request, response) {
    console.log('GET /index');
    var fs = require('fs');
    request.header("Content-Type", 'text/html');
    fs.readFile(__dirname + '/pages/index.html', 'utf8', function(err, data) {
        if (err) {
            this.res.send(err);
        }
        this.res.send(data);
    }.bind({ req: request, res: response }));
});

app.get('/member', function(request, response) {
    console.log('GET /member');
    var fs = require('fs');
    request.header("Content-Type", 'text/html');
    fs.readFile(__dirname + '/pages/member.html', 'utf8', function(err, data) {
        if (err) {
            this.res.send(err);
        }
        this.res.send(data);
    }.bind({ req: request, res: response }));
});

app.post("/index", function(req, res, next) {
    res.render("registOK");
});

app.use(express.static('resource'));

app.get('/image/:picture', function(request, response) {
    var picture = request.params.picture;
    request.header("Content-Type", 'image/jpeg');
    fs.readFile(__dirname + '/resource/' + picture, function(err, data) {
        if (err) {
            this.res.send(err);
        }
        this.res.send(data);
    }.bind({ req: request, res: response }));
});

app.get('/image/location.jpg/1040', function(request, response) {
    var picture = request.params.picture;
    request.header("Content-Type", 'image/jpeg');
    fs.readFile(__dirname + '/resource/location.jpg', function(err, data) {
        if (err) {
            this.res.send(err);
        }
        this.res.send(data);
    }.bind({ req: request, res: response }));
});

var send_location = false;
// 接收來自 LINE 傳送的訊息
app.post('/', function(request, response) {
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
            }
            else if (results[idx].type == 'message') {
                if (results[idx].message.type == 'location') {
                    logger.info('緯度: ' + results[idx].message.latitude);
                    logger.info('經度: ' + results[idx].message.longitude);
                    logger.info(JSON.stringify(results[idx].type));
                    logger.info(tentative_activity.has(results[idx].source.userId));
                    if (tentative_activity.has(results[idx].source.userId)) {
                        logger.info('activity: ' + results[idx].source.userId);
                        var activity = tentative_activity.get(results[idx].source.userId);
                        activity.latitude = results[idx].message.latitude;
                        activity.longitude = results[idx].message.longitude;
                        tentative_activity.set(results[idx].source.userId, activity);
                        var buttons = [
                            {
                                "type": "uri",
                                "label": "填寫活動詳細資訊",
                                "uri": "line://app/1610735667-PqWkJG9O"
                            }
                        ]
                        linemessage.SendButtons(results[idx].source.userId, "請點選以下按鈕，輸入活動細節", buttons, "This is a button", "linehack2018", results[idx].replyToken, function(result) {
                            if (!result) logger.error(result);
                            else logger.info(result);
                        });
                    }
                }
            } else if (results[idx].type == 'postback') {
                var action = results[idx].postback.data.split('=')[1];
                logger.info('回傳使用者執行動作: ' + action);
                if (action == 'createactivity') {
                    var activity = new shuangjiou();
                    if (tentative_activity.has(results[idx].source.userId)) {
                        linemessage.SendMessage(results[idx].source.userId, "不好意思，您還有一個活動還未結束，請結束後在建立新的活動", "linehack2018", results[idx].replyToken, function(result) {
                            if (!result) logger.error(result);
                            else logger.info(result);
                        });
                    } else {
                        activity.shuangjiouid = guid();
                        tentative_activity.set(results[idx].source.userId, activity);
                        var imagemap = [
                            {
                                "type": "uri",
                                "linkUri": "line://nv/location",
                                "area": {
                                    "x": 0,
                                    "y": 0,
                                    "width": 1040,
                                    "height": 1040
                                }
                            }
                        ]
                        linemessage.SendImagemap(results[idx].source.userId, "https://linehack2018.azurewebsites.net/image/location.jpg", "This is an imagemap", imagemap, 'linehack2018', results[idx].replyToken, function(result) {
                            if (!result) logger.error(result);
                            else logger.info(result);
                        });
                    }
                } else if (action == 'searchactivity') {
                    
                } else if (action == 'isactiveactivity') {

                } else {

                }
            }
        }
    } catch (e) {
    }
    response.send('');
});

/*
[
    {
        "type": "message",
        "replyToken": "9f79aff27d9c420a92c5608084e98d44",
        "source":
        {
            "userId": "U04bcc969c65df0e5bba8110c7ae4e3d1",
            "type": "user"
        },
        "timestamp": 1538196800660,
        "message":
        {
            "type": "sticker",
            "id": "8642656052320",
            "stickerId": "179",
            "packageId": "2"
        }
    }
]*/
//this.SendCarousel = function (userId, columns, password, reply_token, callback) {
/*

var flex = lineflex.CreateActivityFlex(activity);
            logger.info(flex);
            linedb.get_userbylocationid(locationid, function (err, users) {
                if (err)
                    logger.error('fail: ' + err);
                else {
                    for (var index = 0; index < users.length; index++) {
                        linemessage.SendFlex(users[index].userid, flex, 'linehack2018', '', function (result) {
                            if (!result) {
                                logger.error('fail: ' + result);
                                this.response.send(err);
                            }
                            else {
                                logger.info('success');
                                this.response.send('200');
                            }
                        }.bind({ response: this.response }));
                    }
                }
            }.bind({ response: this.response }));
*/
function manual_seearch(lat, lng, callback) {
    //this.getdistance = function (lat1, lng1, lat2, lng2)
    //this.get_shuangjious = function (callback) {
    logger.info("manual_seearch: ......................................")
    var location_compare = [];
    linedb.get_shuangjious(function(shuangjious) {
        logger.info("shuangjious: " + JSON.stringify(shuangjious, null, 2))
        for (var idx = 0; idx < shuangjious.length; idx++) {
            logger.info("idx距離: " + linedb.getdistance(shuangjious[idx].latitude, shuangjious[idx].longitude, lat, lng))
            if (location_compare.length == 0) {
                location_compare.push(shuangjious[idx])
            }
            else {
                for (var idy = 0; idy < location_compare.length; idy++) {
                    if (linedb.getdistance(shuangjious[idx].latitude, shuangjious[idx].longitude, lat, lng) <=
                        linedb.getdistance(location_compare[idy].latitude, location_compare[idy].longitude, lat, lng)) {
                        for (var idz = location_compare.length; idz > idy; idz--) {
                            location_compare[idz] = location_compare[idz - 1];
                        }
                        location_compare[idy] = location_compare[idx];
                    }

                }
            }
        }
        logger.info("location_compare: " + JSON.stringify(location_compare, null, 2))
        callback(true)
    })

}
function FollowEvent(acct) {
    logger.info('----------[Follow]---------');
    var new_user = new user();
    linemessage.GetProfile(acct, function(user) {
        this.new_user.name = user.displayName;
        this.new_user.userid = user.userId;
        this.new_user.image = user.pictureUrl;
        linedb.create_user(this.new_user, function(err) {
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
            linemessage.GetProfile(event.source.userId, function(user) {
                this.update_user.name = user.displayName;
                this.update_user.userid = user.userId;
                this.update_user.image = user.pictureUrl;
                this.update_user.location.push(event.beacon.hwid);
                linedb.set_userbyuserid(this.update_user.userid, this.update_user, function(err) {
                    if (err) logger.error('fail' + err);
                    else logger.info('success');
                });
            }.bind({ update_user: update_user }));
            linedb.enter_usertolocation(event.source.userId, event.beacon.hwid, function(err) {
                if (err) logger.error(err);
            });

            //取得此user是否要推揪團訊息
            linedb.get_userbyuserid(event.source.userId, function(err, user) {
                if (err) logger.error('fail' + err);
                else
                    if (user.pushenable) {
                        //取得此Beacon位置訊息
                        linedb.get_locationbyid(this.hwid, function(err, location) {
                            if (err) logger.error('fail' + err);
                            else {
                                let lat = location.latitude;
                                let lon = location.longitude;
                                //取得所有揪團資訊
                                linedb.get_shuangjious(function(err, shuangjious) {
                                    if (err) logger.error('fail' + err);
                                    else {
                                        for (let i = 0; i < shuangjious.length; i++) {
                                            //判斷揪團距離
                                            if (linedb.getdistance(shuangjious[i].latitude, shuangjious[i].longitude, this.lat, this.lon) < 500) {
                                                let flex = lineflex.CreateActivityFlex(shuangjious[i]);
                                                //傳送揪團訊息
                                                linemessage.SendFlex(this.userid, flex, 'linehack2018', '', function(result) {
                                                    if (!result) {
                                                        logger.error('fail: ' + result);
                                                    }
                                                    else {
                                                        logger.info('success');
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }.bind({ lat: lat, lon: lon, userid: this.userid }));
                            }
                        }.bind({ userid: user.userid }));
                    }
            }.bind({ hwid: event.beacon.hwid, userid: event.source.userId }));
            break;
    }
}

function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
