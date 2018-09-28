var linemongodb = function () {
    this.mongoose = require('mongoose');
    this.ShuangJiou = require('./models/shuangjiou');
    this.Host = require('./models/host');
    this.User = require('./models/user');
    this.Location = require('./models/location');
    this.dbConnectPath = 'mongodb+srv://tsti:70771557@cluster0-k85ga.gcp.mongodb.net/LINE?retryWrites=true';
    this.mongoose.connect(this.dbConnectPath, { useNewUrlParser: true });

    //ShuangJiou
    this.create_shuangjiou = function (shuangjiou, callback) {
        console.log('create_shuangjiou: shuangjiou=' + JSON.stringify(shuangjiou));

        /*
        let shuangjiou = {};
        shuangjiou.name = '爽揪';
        shuangjiou.description = '爽揪';
        shuangjiou.starttime = Date.now();
        shuangjiou.endtime = Date.now();
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
                console.log('ShuangJiou saved successfully');
                callback(null);
            }
        });
    }

    this.get_shuangjioubyname = function (name, callback) {
        console.log('get_shuangjioubyname: name=' + name);

        this.ShuangJiou.find({ 'name': name }, function (err, shuangjious) {
            if (err) {
                callback(err);
            }
            else {
                console.log('ShuangJiou get successfully');
                if (shuangjious) {
                    callback(null, shuangjious);
                }
            }
        });
    }

    this.get_shuangjioubylocation = function (location, callback) {
        console.log('get_shuangjioubybeacon: location=' + location);

        this.ShuangJiou.find({ 'location': location }, function (err, shuangjious) {
            if (err) {
                callback(err);
            }
            else {
                console.log('ShuangJiou get successfully');
                if (shuangjious) {
                    callback(null, shuangjious);
                }
            }
        });
    }

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


    //Host
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
        */

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
    }

    this.get_hostbyuserid = function (userid, callback) {
        console.log('get_hostbyuserid: userid=' + userid);

        this.Host.find({ 'userid': userid }, function (err, hosts) {
            if (err) {
                callback(err);
            }
            else {
                console.log('Host get successfully');
                if (hosts) {
                    callback(null, hosts);
                }
            }
        });
    }

    this.get_hostbylocation = function (location, callback) {
        console.log('get_hostbylocation: location=' + location);

        this.Host.find({ 'location': location }, function (err, hosts) {
            if (err) {
                callback(err);
            }
            else {
                console.log('Host get successfully');
                if (hosts) {
                    callback(null, hosts);
                }
            }
        });
    }

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
    this.create_user = function (user, callback) {
        console.log('create_user: user=' + JSON.stringify(user));

        /*
        let user = {};
        user.name = '加一';
        user.userid = 'Uxxxxxxxx2';
        user.image = 'http:xxxxx.xxx.xx';
        user.location = '[Bxxxxxxxx1]';
        */

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
    }

    this.get_userbyuserid = function (userid, callback) {
        console.log('get_userbyuserid: userid=' + userid);

        this.User.find({ 'userid': userid }, function (err, users) {
            if (err) {
                callback(err);
            }
            else {
                console.log('User get successfully');
                if (users) {
                    callback(null, users);
                }
            }
        });
    }

    this.get_userbylocationid = function (locationid, callback) {
        console.log('get_userbylocation: locationid=' + locationid);

        this.User.find({ 'location': { "$in": locationid } }, function (err, users) {
            if (err) {
                callback(err);
            }
            else {
                console.log('User get successfully');
                if (users) {
                    callback(null, users);
                }
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

    this.add_watchlocationbyuserid = function (userid, locationid, callback) {
        console.log('add_watchlocationbyuserid: userid=' + userid + ' locationid=' + locationid);

        this.User.updateOne({ 'userid': userid }, { $push: { 'location': locationid } }, function (err) {
            if (err) {
                callback(err);
            }
            else {
                console.log('User addwatchlocation successfully');
                callback(null);
            }
        });
    }

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
    this.create_location = function (location, callback) {
        console.log('create_location: user=' + JSON.stringify(location));

        /*
        let location = {};
        location.name = '7-11';
        location.locationid = 'Bxxxxxxxxx1';
        location.user = [];
        */

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
    }

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

    this.get_locationuser = function (locationid, callback) {
        console.log('get_locationuser: locationid=' + locationid);

        this.Location.findOne({ 'locationid': locationid }, function (err, location) {
            if (err) {
                callback(err);
            }
            else {
                console.log('Location getuser successfully');
                if (location)
                    callback(null, location.user);
            }
        });
    }
}

exports.linemongodb = linemongodb;