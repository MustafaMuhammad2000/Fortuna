const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    monthlylimit: {type: Number, required: true},
    transactions: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Transactions'}]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
