var linemongodb = require('./linemongodb');
var linedb = new linemongodb.linemongodb();

/*
let user = {};
user.name = '加一';
user.userid = 'Uxxxxxxxx1';
user.image = 'http:xxxxx.xxx.xx1';
user.location = 'Bxxxxxxxx1';
linedb.create_user(user, function (err) {
    if (err)
        console.log('fail: ' + err);
    else
        console.log('success');
});

user.name = '加二';
user.userid = 'Uxxxxxxxx2';
user.image = 'http:xxxxx.xxx.xx2';
user.location = 'Bxxxxxxxx1';
linedb.create_user(user, function (err) {
    if (err)
        console.log('fail: ' + err);
    else
        console.log('success');
});

let host = {};
host.name = '加一';
host.userid = 'Uxxxxxxxx1';
host.gender = '男';
host.clothes = '無';
host.hat = '無';
host.location = 'Bxxxxxxxx1';

linedb.create_host(host, function (err) {
    if (err)
        console.log('fail: ' + err);
    else
        console.log('success');
});

let shuangjiou = {};
shuangjiou.name = '爽揪';
shuangjiou.description = '爽揪';
shuangjiou.time = Date.now();
shuangjiou.type = '吃';
shuangjiou.host = 'Uxxxxxxxx1';
shuangjiou.location = 'Bxxxxxxxx1';
shuangjiou.number = '99';
shuangjiou.participant = [];
linedb.create_shuangjiou(shuangjiou, function (err) {
    if (err)
        console.log('fail: ' + err);
    else
        console.log('success');
});
*/

linedb.get_shuangjioubylocation('Bxxxxxxxx1', function (err, shuangjious) {
    if (err) {
        console.log(err); return;
    }
    console.log('get_shuangjioubylocation = ' + shuangjious);
});

linedb.get_userbylocation('Bxxxxxxxx1', function (err, users) {
    if (err) {
        console.log(err); return;
    }
    console.log('get_userbylocation = ' + users);
});

linedb.get_hostbylocation('Bxxxxxxxx1', function (err, hosts) {
    if (err) {
        console.log(err); return;
    }
    console.log('get_hostbylocation = ' + hosts);
});