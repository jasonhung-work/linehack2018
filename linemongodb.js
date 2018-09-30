<<<<<<< HEAD
var linemongodb = function () {
    this.mongoose = require('mongoose');
    this.ShuangJiou = require('./models/shuangjiou');
    this.Host = require('./models/host');
    this.User = require('./models/user');
    this.Location = require('./models/location');
    this.dbConnectPath = 'mongodb+srv://tsti:70771557@cluster0-k85ga.gcp.mongodb.net/LINE?retryWrites=true';
    this.mongoose.connect(this.dbConnectPath, { useNewUrlParser: true });

    //ShuangJiou
    //建立爽揪資訊
    this.create_shuangjiou = function (shuangjiou, callback) {
        console.log('create_shuangjiou: shuangjiou=' + JSON.stringify(shuangjiou));

        /*
        let shuangjiou = {};
        shuangjiou.shuangjiouid = 'Idxxxx1';
        shuangjiou.name = '爽揪';
        shuangjiou.description = '爽揪';
        shuangjiou.time = Date.now();
        shuangjiou.type = '吃';
        shuangjiou.location = 'Bxxxxxxxx1';
        shuangjiou.latitude = '25.0805773';
        shuangjiou.longitude = '121.565819';
        shuangjiou.host = 'Uxxxxxxxx1';
        shuangjiou.number = '999';
        shuangjiou.member = '';
        */
        this.ShuangJiou.findOneAndUpdate({ 'shuangjiouid': shuangjiou.shuangjiouid }, shuangjiou, { upsert: true, new: true, setDefaultsOnInsert: true }, function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('ShuangJiou saved successfully');
                callback(null);
            }
        });

        /*
        let addShuangJiou = new this.ShuangJiou(shuangjiou);
        addShuangJiou.save(function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('ShuangJiou saved successfully');
                callback(null);
            }
        });
        */
    }

    //根據名稱取得爽揪資訊
    this.get_shuangjioubyname = function (name, callback) {
        console.log('get_shuangjioubyname: name=' + name);

        this.ShuangJiou.find({ 'name': name }, function (err, shuangjious) {
            if (err) {
                callback(err);
            }
            else {
                console.log('ShuangJiou get successfully');
                if (shuangjious)
                    callback(null, shuangjious);
                else
                    callback(null, null);
            }
        });
    }

    //根據Id取得爽揪資訊
    this.get_shuangjioubyshuangjiouid = function (shuangjiouid, callback) {
        console.log('get_shuangjioubyid: shuangjiouid=' + shuangjiouid);

        this.ShuangJiou.find({ 'shuangjiouid': shuangjiouid }, function (err, shuangjious) {
            if (err) {
                callback(err);
            }
            else {
                console.log('ShuangJiou get successfully');
                if (shuangjious)
                    callback(null, shuangjious);
                else
                    callback(null, null);
            }
        });
    }

    //根據BeaconId取得爽揪資訊
    this.get_shuangjioubylocation = function (location, callback) {
        console.log('get_shuangjioubybeacon: location=' + location);

        this.ShuangJiou.find({ 'location': location }, function (err, shuangjious) {
            if (err) {
                callback(err);
            }
            else {
                console.log('ShuangJiou get successfully');
                if (shuangjious)
                    callback(null, shuangjious);
                else
                    callback(null, null);
            }
        });
    }

    //根據揪團名稱更新爽揪資訊
    this.set_shuangjioubyname = function (name, shuangjiou, callback) {
        console.log('set_shuangjioubyname: name=' + name + ' shuangjiou=' + JSON.stringify(shuangjiou));

        this.ShuangJiou.updateOne({ 'name': name }, shuangjiou, function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('ShuangJiou update successfully');
                callback(null);
            }
        });
    }

    //根據揪團名稱刪除爽揪資訊
    this.delete_shuangjioubyname = function (name, callback) {
        console.log('delete_shuangjioubyname: name=' + name);

        this.ShuangJiou.deleteOne({ 'name': name }, shuangjiou, function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('ShuangJiou delete successfully');
                callback(null);
            }
        });
    }

    //取得所有揪團資訊
    this.get_shuangjious = function (callback) {
        console.log('get_shuangjious');

        this.ShuangJiou.find(function (err, shuangjious) {
            if (err) {
                callback(err);
            }
            else {
                console.log('ShuangJiou get successfully');
                if (shuangjious)
                    callback(shuangjious);
                else
                    callback(null);
            }
        });
    }

    //Host
    //建立爽主資訊
    this.create_host = function (host, callback) {
        console.log('create_host: host=' + JSON.stringify(host));

        /*
        let host = {};
        host.name = '爽揪2';
        host.userid = 'Uxxxxxxxx1'
        host.gender = '女';
        host.clothes = '洋裝';
        host.hat = '草帽';
        host.location = 'Bxxxxxxxx1';
        host.shuangjiouid = 'Idxxxx1';
        */

        this.Host.findOneAndUpdate({ 'shuangjiouname': host.shuangjiouname }, host, { upsert: true, new: true, setDefaultsOnInsert: true }, function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('Host saved successfully');
                callback(null);
            }
        });

        /*
        let addHost = new this.Host(host);
        addHost.save(function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('Host saved successfully');
                callback(null);
            }
        });
        */
    }

    //根據UserId取得爽主資訊
    this.get_hostbyuserid = function (userid, callback) {
        console.log('get_hostbyuserid: userid=' + userid);

        this.Host.find({ 'userid': userid }, function (err, hosts) {
            if (err) {
                callback(err);
            }
            else {
                console.log('Host get successfully');
                if (hosts)
                    callback(null, hosts);
                else
                    callback(null, null);
            }
        });
    }

    //根據shuangjiouid取得爽主資訊
    this.get_hostbyshuangjiouid = function (shuangjiouid, callback) {
        console.log('get_hostbyshuangjiouid: shuangjiouid=' + shuangjiouid);

        this.Host.find({ 'shuangjiouid': shuangjiouid }, function (err, hosts) {
            if (err) {
                callback(err);
            }
            else {
                console.log('Host get successfully');
                if (hosts)
                    callback(null, hosts);
                else
                    callback(null, null);
            }
        });
    }

    //根據揪團名稱取得爽主資訊
    this.get_hostbyshuangjiouname = function (shuangjiouname, callback) {
        console.log('get_hostbyshuangjiouname: shuangjiouname=' + shuangjiouname);

        this.Host.findOne({ 'shuangjiouname': shuangjiouname }, function (err, hosts) {
            if (err) {
                callback(err);
            }
            else {
                console.log('Host get successfully');
                if (hosts)
                    callback(null, hosts);
                else
                    callback(null, null);
            }
        });
    }

    //根據BeaconId取得爽主資訊
    this.get_hostbylocation = function (location, callback) {
        console.log('get_hostbylocation: location=' + location);

        this.Host.find({ 'location': location }, function (err, hosts) {
            if (err) {
                callback(err);
            }
            else {
                console.log('Host get successfully');
                if (hosts)
                    callback(null, hosts);
                else
                    callback(null, null);
            }
        });
    }

    //根據爽主名稱更新爽主資訊
    this.set_hostbyname = function (name, host, callback) {
        console.log('set_hostbyname: name=' + name + ' host=' + JSON.stringify(host));

        this.Host.updateOne({ 'name': name }, host, function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('Host update successfully');
                callback(null);
            }
        });
    }

    //根據爽主UserId更新爽主資訊
    this.set_hostbyuserid = function (userid, host, callback) {
        console.log('set_hostbyuserid: userid=' + userid + ' host=' + JSON.stringify(host));

        this.Host.updateOne({ 'userid': userid }, host, function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('Host update successfully');
                callback(null);
            }
        });
    }

    //根據爽主名稱刪除爽主資訊
    this.delete_hostbyname = function (name, callback) {
        console.log('delete_hostbyname: name=' + name);

        this.Host.deleteOne({ 'name': name }, host, function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('Host delete successfully');
                callback(null);
            }
        });
    }

    //根據爽主UserId刪除爽主資訊
    this.delete_hostbyuserid = function (userid, callback) {
        console.log('delete_hostbyuserid: userid=' + userid);

        this.Host.deleteOne({ 'userid': userid }, host, function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('Host delete successfully');
                callback(null);
            }
        });
    }


    //User
    //建立使用者
    this.create_user = function (user, callback) {
        console.log('create_user: user=' + JSON.stringify(user));

        /*
        let user = {};
        user.name = '加一';
        user.userid = 'Uxxxxxxxx2';
        user.image = 'http:xxxxx.xxx.xx';
        user.location = '[Bxxxxxxxx1]';
        user.pushenable = 'true';        
        */

        this.User.findOneAndUpdate({ 'userid': user.userid }, user, { upsert: true, new: true, setDefaultsOnInsert: true }, function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('User saved successfully');
                callback(null);
            }
        });

        /*
         let addUser = new this.User(user);
         addUser.save(function (err) {
             if (err) {
                 callback(err);
             }
             else {
                 console.log('User saved successfully');
                 callback(null);
             }
         });
         */
    }

    //根據UserId取得使用者資訊
    this.get_userbyuserid = function (userid, callback) {
        console.log('get_userbyuserid: userid=' + userid);

        this.User.findOne({ 'userid': userid }, function (err, user) {
            if (err) {
                callback(err);
            }
            else {
                console.log('User get successfully');
                if (user)
                    callback(null, user);
                else
                    callback(null, null);
            }
        });
    }

    //根據關注的BeaconId取得使用者資訊
    this.get_userbylocationid = function (locationid, callback) {
        console.log('get_userbylocation: locationid=' + locationid);

        this.User.find({ 'location': { "$in": locationid } }, function (err, users) {
            if (err) {
                callback(err);
            }
            else {
                console.log('User get successfully');
                if (users)
                    callback(null, users);
                else
                    callback(null, null);
            }
        });
    }

    /*
    this.delete_userbyuserid = function (userid, callback) {
        console.log('get_userbyuserid: userid=' + userid);
        this.User.deleteOne({ 'userid': userid }, function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('User delete successfully');
                callback(null);
            }
        });
    }
    */

    //使用者加入關注的BeaconId
    this.add_watchlocationbyuserid = function (userid, locationid, callback) {
        console.log('add_watchlocationbyuserid: userid=' + userid + ' locationid=' + locationid);

        this.User.updateOne({ 'userid': userid }, { $addToSet: { 'location': locationid } }, function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('User addwatchlocation successfully');
                callback(null);
            }
        });
    }

    //使用者移除關注的BeaconId
    this.remove_watchlocationbyuserid = function (userid, locationid, callback) {
        console.log('remove_watchlocationbyuserid: userid=' + userid + ' locationid=' + locationid);

        this.User.updateOne({ 'userid': userid }, { $pull: { 'location': locationid } }, function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('User removewatchlocation successfully');
                callback(null);
            }
        });
    }

    /*
    this.delete_userbylocation = function (location, callback) {
        console.log('delete_userbylocation: location=' + location);
        this.User.deleteOne({ 'location': location }, function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('User delete successfully');
                callback(null);
            }
        });
    }
    */

    //根據名稱更新使用者資訊
    this.set_userbyname = function (name, user, callback) {
        console.log('set_userbyname: name=' + name + ' user=' + JSON.stringify(user));

        this.User.updateOne({ 'name': name }, user, function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('User update successfully');
                callback(null);
            }
        });
    }

    //根據UserId更新使用者資訊
    this.set_userbyuserid = function (userid, user, callback) {
        console.log('set_userbyuserid: userid=' + userid + ' user=' + JSON.stringify(user));

        this.User.updateOne({ 'userid': userid }, user, function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('User update successfully');
                callback(null);
            }
        });
    }


    //Location
    //建立Beacon資訊
    this.create_location = function (location, callback) {
        console.log('create_location: user=' + JSON.stringify(location));

        /*
        let location = {};
        location.name = '7-11';
        location.locationid = 'Bxxxxxxxxx1';
        location.latitude = '25.0805773';
        location.longitude = '121.565819';
        location.user = [];
        */


        this.Location.findOneAndUpdate({ 'locationid': location.locationid }, location, { upsert: true, new: true, setDefaultsOnInsert: true }, function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('Location saved successfully');
                callback(null);
            }
        });

        /*
        let addLocation = new this.Location(location);
        addLocation.save(function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('Location saved successfully');
                callback(null);
            }
        });
        */
    }

    //加入進入Beacon的使用者UserId
    this.enter_usertolocation = function (userid, locationid, callback) {
        console.log('enter_usertolocation: userid=' + userid + ' locationid=' + locationid);

        this.Location.updateOne({ 'locationid': locationid }, { $addToSet: { 'user': userid } }, function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('Location adduser successfully');
                callback(null);
            }
        });
    }

    //移除離開Beacon的使用者UserId
    this.leave_userfromlocation = function (userid, locationid, callback) {
        console.log('leave_userfromlocation: userid=' + userid + ' locationid=' + locationid);

        this.Location.updateOne({ 'locationid': locationid }, { $pull: { 'user': userid } }, function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('Location removeuser successfully');
                callback(null);
            }
        });
    }

    //取得進入此BeaconId的使用者UserId
    this.get_locationuser = function (locationid, callback) {
        console.log('get_locationuser: locationid=' + locationid);
=======
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
>>>>>>> parent of 676c3f3... fix

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

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next();
});

app.get('/api', function (request, response) {
    response.send('API is running');
});

app.get('/api/richmenulist', function (request, response) {
    linerichmenu.GetAllRichMenu(function (result) {
        if (result) response.send(result);
        else response.send(false);
    });
});

app.get('/api/richmenu/:richmenuid', function (request, response) {
    var richmenuid = request.params.richmenuid;
    linerichmenu.GetRichMenu(richmenuid, function (result) {
        if (result) response.send(result);
        else response.send(false);
    });
});

app.post('/api/richmenu', function (request, response) {
    var richmenu = request.body.richmenu;
    linerichmenu.CreateRichMenu(richmenu, function (result) {
        if (result) response.send(result);
        else response.send(false);
    });
});

app.get('/api/richmenulist', function (request, response) {
    linerichmenu.GetAllRichMenu(function (result) {
        if (result) response.send(result);
        else response.send(false);
    });
});

app.get('/api/richmenu/:richmenuid', function (request, response) {
    var richmenuid = request.params.richmenuid;
    linerichmenu.GetRichMenu(richmenuid, function (result) {
        if (result) response.send(result);
        else response.send(false);
    });
});

app.post('/api/richmenu', function (request, response) {
    var richmenu = request.body.richmenu;
    linerichmenu.CreateRichMenu(richmenu, function (result) {
        if (result) response.send(result);
        else response.send(false);
    });
});

app.delete('/api/richmenu/:richmenu', function (request, response) {
    var richmuneId = request.params.richmenuid;
    linerichmenu.DeleteRichMenu(richmuneId, function (result) {
        if (result) response.send(true);
        else response.send(false);
    });
});

app.put('/api/richmenu/defaultrichmenu', function (request, response) {
    var richmenuId = request.body.richmenuid;
    linerichmenu.SetDefaultRichMenu(richmenuId, function (result) {
        if (result) response.send(true);
        else response.send(false);
    });
});

app.put('/api/richmenu/link', function (request, response) {
    var userId = request.body.userid;
    var richmenuId = request.body.richmenuid;
    linerichmenu.LinkRichMenuToUser(userId, richmenuId, function (result) {
        if (result) response.send(true);
        else response.send(false);
    });
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
        activity.fare = data.shuangjiou.fare;
        linedb.create_shuangjiou(activity, function (err) {
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
        linedb.create_host(organiser, function (err) {
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
        linemessage.SendButtons(data.host.userId, "您的活動已建立，可以點選以下按鈕查看參加者", buttons, "This is a button", "linehack2018", "", function (result) {
            if (!result) logger.error(result);
            else logger.info(result);
        });
        response.send('200');
    }
});

app.post('/api/guest', function (request, response) {
    var userId = request.body.userId;
    logger.info(userId);
    linedb.get_shuangjioubyhost(userId, function (err, host) {
        var data = [];
        if (err) {
            logger.info('fail: ' + err);
            this.res.send(err);
        }
        else {
            logger.info('success');
            logger.info(host);
            if (host != null && host.participant) {
                for (var index = 0; index < host.participant.length; index++) { //有問題
                    linedb.get_userbyuserid(host.participant[index], function (err, user) {
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
            } else {
                this.res.send('');
            } 
        }
    }.bind({ res: response }));
});

app.post('/api/finish', function (request, response) {
    var userId = request.body.userId;
    if (tentative_activity.has(userId));
    tentative_activity.delete(data.host.userId);
    linedb.delete_hostbyuserid(userId, function (err, host) {
        if (err) {
            logger.info('fail: ' + err);
        }
        else {
            logger.info('success');
        }
    });
    linedb.delete_shuangjioubyhost(userId, function (err, shuangjiou) {
        if (err) {
            logger.info('fail: ' + err);
        }
        else {
            logger.info('success');
        }
    });
    linemessage.SendMessage(userId, "活動已完成，感謝您的使用!", "linehack2018", '', function (result) {
        if (!result) logger.error(result);
        else {
            logger.info(result);
            this.response.send('200');
        }
    }.bind({ response: response }));
});

app.use(express.static('pages'));
app.get('/index', function (request, response) {
    console.log('GET /index');
    var fs = require('fs');
    request.header("Content-Type", 'text/html');
    fs.readFile(__dirname + '/pages/index.html', 'utf8', function (err, data) {
        if (err) {
            this.res.send(err);
        }
        this.res.send(data);
    }.bind({ req: request, res: response }));
});

app.get('/member', function (request, response) {
    console.log('GET /member');
    var fs = require('fs');
    request.header("Content-Type", 'text/html');
    fs.readFile(__dirname + '/pages/member.html', 'utf8', function (err, data) {
        if (err) {
            this.res.send(err);
        }
        this.res.send(data);
    }.bind({ req: request, res: response }));
});

app.post("/index", function (req, res, next) {
    res.render("registOK");
});

app.use(express.static('resource'));

app.get('/image/:picture', function (request, response) {
    var picture = request.params.picture;
    request.header("Content-Type", 'image/jpeg');
    fs.readFile(__dirname + '/resource/' + picture, function (err, data) {
        if (err) {
            this.res.send(err);
        }
        this.res.send(data);
    }.bind({ req: request, res: response }));
});

app.get('/image/location.jpg/1040', function (request, response) {
    var picture = request.params.picture;
    request.header("Content-Type", 'image/jpeg');
    fs.readFile(__dirname + '/resource/location.jpg', function (err, data) {
        if (err) {
            this.res.send(err);
        }
        this.res.send(data);
    }.bind({ req: request, res: response }));
});

var send_location = false;
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
                        linemessage.SendButtons(results[idx].source.userId, "請點選以下按鈕，輸入活動細節", buttons, "This is a button", "linehack2018", results[idx].replyToken, function (result) {
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
                    linedb.get_shuangjioubyhost(results[idx].source.userId, function (err, step_activity) {
                        logger.info(step_activity);
                        if (step_activity) {
                            activity.shuangjiouid = step_activity.shuangjiouid;
                            activity.name = step_activity.name;
                            activity.description = step_activity.description;
                            activity.starttime = step_activity.starttime;
                            activity.endtime = step_activity.endtime;
                            activity.type = step_activity.type;
                            activity.host = step_activity.host;
                            activity.number = step_activity.number;
                            activity.fare = step_activity.fare;
                            activity.latitude = step_activity.latitude;
                            activity.longitude = step_activity.longitude;
                            this.tentative_activity.set(this.results.source.userId, activity);
                        }
                        logger.info(this.tentative_activity.has(this.results.source.userId));
                        if (this.tentative_activity.has(this.results.source.userId)) {
                            linemessage.SendMessage(this.results.source.userId, "不好意思，您還有一個活動還未結束，請結束後在建立新的活動", "linehack2018", this.results.replyToken, function (result) {
                                if (!result) logger.error(result);
                                else logger.info(result);
                            });
                        } else {
                            activity.shuangjiouid = guid();
                            this.tentative_activity.set(this.results.source.userId, activity);
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
                            linemessage.SendImagemap(this.results.source.userId, "https://linehack2018.azurewebsites.net/image/location.jpg", "This is an imagemap", imagemap, 'linehack2018', this.results.replyToken, function (result) {
                                if (!result) logger.error(result);
                                else logger.info(result);
                            });
                        }
                    }.bind({ results: results[idx] , tentative_activity: tentative_activity}));
                } else if (action == 'searchactivity') {

                } else if (action == 'isactiveactivity') {
                    var buttons = [
                        {
                            "type": "postback",
                            "label": "Yes",
                            "data": "action=setbeaconon"
                        },
                        {
                            "type": "postback",
                            "label": "No",
                            "data": "action=setbeaconoff"
                        }
                    ]
                    linemessage.SendConfirm(results[idx].source.userId, '請問您想要在經過beacon時，收到活動資訊嗎?', buttons, 'this is a confirm', 'linehack2018', results[idx].replyToken, function (result) {
                        if (!result) logger.error(result);
                        else logger.info(result);
                    });
                } else if (action == 'setbeaconon') {

                    linemessage.SendMessage(results[idx].source.userId, '您已將活動通知開啟', 'linehack2018', results[idx].replyToken, function (result) {
                        if (!result) logger.error(result);
                        else logger.info(result);
                    });
                } else if (action == 'setbeaconoff') {

                    linemessage.SendMessage(results[idx].source.userId, '您已將活動通知關閉', 'linehack2018', results[idx].replyToken, function (result) {
                        if (!result) logger.error(result);
                        else logger.info(result);
                    });
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
    linedb.get_shuangjious(function (shuangjious) {
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

<<<<<<< HEAD
    //計算距離(公尺)
    this.getdistance = function (lat1, lng1, lat2, lng2) {
        var radLat1 = lat1 * Math.PI / 180.0;
        var radLat2 = lat2 * Math.PI / 180.0;
        var a = radLat1 - radLat2;
        var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137;// EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000;
        return s * 1000;
=======
}
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
                linedb.set_userbyuserid(this.update_user.userid, this.update_user, function (err) {
                    if (err) logger.error('fail' + err);
                    else logger.info('success');
                });
            }.bind({ update_user: update_user }));
            linedb.enter_usertolocation(event.source.userId, event.beacon.hwid, function (err) {
                if (err) logger.error(err);
            });

            //取得此user是否要推揪團訊息
            linedb.get_userbyuserid(event.source.userId, function (err, user) {
                if (err) logger.error('fail' + err);
                else
                    if (user.pushenable) {
                        //取得此Beacon位置訊息
                        linedb.get_locationbyid(this.hwid, function (err, location) {
                            if (err) logger.error('fail' + err);
                            else {
                                let lat = location.latitude;
                                let lon = location.longitude;
                                //取得所有揪團資訊
                                linedb.get_shuangjious(function (err, shuangjious) {
                                    if (err) logger.error('fail' + err);
                                    else {
                                        for (let i = 0; i < shuangjious.length; i++) {
                                            //判斷揪團距離
                                            if (linedb.getdistance(shuangjious[i].latitude, shuangjious[i].longitude, this.lat, this.lon) < 500) {
                                                let flex = lineflex.CreateActivityFlex(shuangjious[i]);
                                                //傳送揪團訊息
                                                linemessage.SendFlex(this.userid, flex, 'linehack2018', '', function (result) {
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
>>>>>>> parent of 676c3f3... fix
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
