var mongoose =  require('mongoose');
// var schema =  mongoose.Schema;
// module.exports = mongoose.model('User', new schema({
//     email    : String,
//     password: String
// }));

const UserSchema = mongoose.Schema({
	email: String,
	password: String
})

module.exports = mongoose.model('User', UserSchema);