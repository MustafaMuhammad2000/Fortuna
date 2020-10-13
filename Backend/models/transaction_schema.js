const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    id: {type: Number, required: true},
    description: {type: String, required: true},
    amount: {type: Number, required: true},
    category: {type: String, required: true},
    date: {type: Date, default: Date.now},
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
})

module.exports = mongoose.model('Transactions', transactionSchema);