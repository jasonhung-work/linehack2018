var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('host', new Schema({
    name: String,
    userid: String,
    gender: String,
    clothes: String,
    hat: String,
    location: String
}), 'host');