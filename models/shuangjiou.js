var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('shuangjiou', new Schema({
    name: String,
    description: String,
    time: Date,
    type: String,
    location: String,
    host: String,
    number: Number,
    participant: [String]
}), 'shuangjiou');