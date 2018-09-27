
var linemongodb = function (logger) {
    this.mongoose = require('mongoose');
    this.ShuangJiou = require('./models/shuangjiou');
    this.Host = require('./models/host');
    this.User = require('./models/user');
    this.dbConnectPath = 'mongodb+srv://tsti:70771557@cluster0-k85ga.gcp.mongodb.net/LINE?retryWrites=true';
    this.mongoose.connect(this.dbConnectPath, { useNewUrlParser: true });

    //ShuangJiou
    this.create_shuangjiou = function (shuangjiou, callback) {
        logger.info('create_shuangjiou: shuangjiou=' + JSON.stringify(shuangjiou));

        /*
        let shuangjiou = {};
        shuangjiou.name = '爽揪';
        shuangjiou.description = '爽揪';
        shuangjiou.time = Date.now();
        shuangjiou.type = '吃';
        shuangjiou.location = 'Bxxxxxxxx1';
        shuangjiou.host = 'Uxxxxxxxx1';
        shuangjiou.number = '999';
        shuangjiou.member = '';
        */

        let addShuangJiou = new this.ShuangJiou(shuangjiou);
        addShuangJiou.save(function (err) {
            if (err) {
                callback(err);
            }
            else {
                logger.info('ShuangJiou saved successfully');
                callback();
            }
        });
    }

    this.get_shuangjioubyname = function (name, callback) {
        logger.info('get_shuangjioubyname: name=' + name);

        this.ShuangJiou.find({ 'name': name }, function (err, shuangjious) {
            if (err) return callback(err, null);
            if (shuangjious) {
                callback(null, shuangjious);
            }
        });
    }

    this.get_shuangjioubylocation = function (location, callback) {
        logger.info('get_shuangjioubybeacon: location=' + location);

        this.ShuangJiou.find({ 'location': location }, function (err, shuangjious) {
            if (err) return callback(err, null);
            if (shuangjious) {
                callback(null, shuangjious);
            }
        });
    }

    this.set_shuangjioubyname = function (name, shuangjiou, callback) {
        logger.info('set_shuangjioubyname: name=' + name + ' shuangjiou=' + JSON.stringify(shuangjiou));

        this.ShuangJiou.updateOne({ 'name': name }, shuangjiou, function (err, raw) {
            if (err) return callback(err);
            callback(null);
        });
    }


    //Host
    this.create_host = function (host, callback) {
        logger.info('create_host: host=' + JSON.stringify(host));

        /*
        let host = {};
        host.name = '爽揪2';
        host.userid = 'Uxxxxxxxx1'
        host.gender = '女';
        host.clothes = '洋裝';
        host.hat = '草帽';
        host.location = 'Bxxxxxxxx1';
        */

        let addHost = new this.Host(host);
        addHost.save(function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('Host saved successfully');
                callback();
            }
        });
    }

    this.get_hostbyuserid = function (userid, callback) {
        logger.info('get_hostbyuserid: userid=' + userid);

        this.Host.find({ 'userid': userid }, function (err, hosts) {
            if (err) return callback(err, null);
            if (hosts) {
                callback(null, hosts);
            }
        });
    }

    this.get_hostbylocation = function (location, callback) {
        logger.info('get_hostbylocation: location=' + location);

        this.Host.find({ 'location': location }, function (err, hosts) {
            if (err) return callback(err, null);
            if (hosts) {
                callback(null, hosts);
            }
        });
    }

    this.set_hostbyname = function (name, host, callback) {
        logger.info('set_hostbyname: name=' + name + ' host=' + JSON.stringify(host));

        this.Host.updateOne({ 'name': name }, host, function (err, raw) {
            if (err) return callback(err);
            callback(null);
        });
    }

    this.set_hostbyuserid = function (userid, host, callback) {
        logger.info('set_hostbyuserid: userid=' + userid + ' host=' + JSON.stringify(host));

        this.Host.updateOne({ 'userid': userid }, host, function (err, raw) {
            if (err) return callback(err);
            callback(null);
        });
    }

    //User
    this.create_user = function (user, callback) {
        logger.info('create_user: user=' + JSON.stringify(user));

        /*
        let user = {};
        user.name = '加一';
        user.userid = 'Uxxxxxxxx2';
        user.image = 'http:xxxxx.xxx.xx';
        user.location = 'Bxxxxxxxx1';
        */

        let addUser = new this.User(user);
        addUser.save(function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('User saved successfully');
                callback();
            }
        });
    }

    this.get_userbyuserid = function (userid, callback) {
        logger.info('get_userbyuserid: userid=' + userid);

        this.User.find({ 'userid': userid }, function (err, users) {
            if (err) return callback(err, null);
            if (users) {
                callback(null, users);
            }
        });
    }

    this.get_userbylocation = function (location, callback) {
        logger.info('get_hostbylocation: location=' + location);

        this.User.find({ 'location': location }, function (err, users) {
            if (err) return callback(err, null);
            if (users) {
                callback(null, users);
            }
        });
    }

    this.set_userbyname = function (name, user, callback) {
        logger.info('set_userbyname: name=' + name + ' user=' + JSON.stringify(user));

        this.User.updateOne({ 'name': name }, user, function (err, raw) {
            if (err) return callback(err);
            callback(null);
        });
    }

    this.set_userbyuserid = function (userid, user, callback) {
        logger.info('set_hostbyuserid: userid=' + userid + ' user=' + JSON.stringify(user));

        this.User.updateOne({ 'userid': userid }, user, function (err, raw) {
            if (err) return callback(err);
            callback(null);
        });
    }
}

exports.linemongodb = linemongodb;