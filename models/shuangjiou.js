//活動內容
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('shuangjiou', new Schema({
    shuangjiouid: String,
    name: String,
    description: String,
    starttime: Date,
    endtime: Date,
    type: String,
    location: String,
    latitude: String,
    longitude: String,
    host: String,
    number: Number,
    participant: [String]
}), 'shuangjiou');