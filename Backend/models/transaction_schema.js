const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    id: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    amount: {type: Number, required: true},
    category: {type: String, required: true},
    date: {type: Date, required: true},
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
})

transactionSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Transactions', transactionSchema);