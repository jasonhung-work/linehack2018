var fs = require('fs');
var config = fs.readFileSync(__dirname + '/config.json', 'utf8');
config = JSON.parse(config);

var linerichmenu = function () {
    this.CreateRichMenu = function (richmenu, callback) {
        var RichMenuId = "";
        var data = {
            "size": {
                "width": 2500,
                "height": 1686
            },
            "selected": richmenu.selected,
            "name": richmenu.name,
            "chatBarText": richmenu.chatBarText,
            "areas": richmenu.areas
        }
        logger.info(JSON.stringify(data));
        var options = {
            host: 'api.line.me',
            port: '443',
            path: '/v2/bot/richmenu',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Content-Length': Buffer.byteLength(JSON.stringify(data)),
                'Authorization': 'Bearer <' + config.channel_access_token + '>'
            }
        };
        var https = require('https');
        var req = https.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                logger.info('Response: ' + chunk);
                RichMenuId = RichMenuId + chunk;
            });
            res.on('end', function () {
                logger.info('Add RichMenu status code: ' + res.statusCode);
                if (res.statusCode == 200) {
                    logger.info('Add RichMenu success');
                    this.callback(LIFF_ID);
                } else {
                    logger.info('Add RichMenu failure');
                    this.callback(false);
                }
            }.bind({ callback: this.callback }));
        }.bind({ callback: callback }));
        req.write(JSON.stringify(data));
        req.end();
    }

    this.CreateRichMenu = function (richmenu, callback) {
        var RichMenuId = "";
        var data = {
            "size": {
                "width": 2500,
                "height": 1686
            },
            "selected": richmenu.selected,
            "name": richmenu.name,
            "chatBarText": richmenu.chatBarText,
            "areas": richmenu.areas
        }
        logger.info(JSON.stringify(data));
        var options = {
            host: 'api.line.me',
            port: '443',
            path: '/v2/bot/richmenu',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Content-Length': Buffer.byteLength(JSON.stringify(data)),
                'Authorization': 'Bearer <' + config.channel_access_token + '>'
            }
        };
        var https = require('https');
        var req = https.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                logger.info('Response: ' + chunk);
                RichMenuId = RichMenuId + chunk;
            });
            res.on('end', function () {
                logger.info('Add RichMenu status code: ' + res.statusCode);
                if (res.statusCode == 200) {
                    logger.info('Add RichMenu success');
                    this.callback(LIFF_ID);
                } else {
                    logger.info('Add RichMenu failure');
                    this.callback(false);
                }
            }.bind({ callback: this.callback }));
        }.bind({ callback: callback }));
        req.write(JSON.stringify(data));
        req.end();
    }
}

exports.linerichmenu = linerichmenu;