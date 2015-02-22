var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  token: String,
  secret: String

});

module.exports = mongoose.model('User', UserSchema);
