const mongoose = require('mongoose');


const HttpError = require('../models/http-error');
const Transaction = require('../models/transaction_schema');
const User = require('../models/user_schema');


const getTransactions = async (req, res, next) => {
    let userWithTransactions;
  try {
    userWithTransactions = await User.findById(req.userData.userId).populate('transactions');
  } catch (err) {
    const error = new HttpError(
      'Fetching transactions failed, please try again later',
      500
    );
    return next(error);
  }
  if (!userWithTransactions) {
    return next(
      new HttpError('Could not find transactions for the provided user id.', 404)
    );
  }

  res.json({
    transactions: userWithTransactions.transactions.map(transaction =>
      transaction.toObject({ getters: true })
    )
  });
};

const addTransaction = async (req,res,next) =>{
    const {id, description, amount, category, date} = req.body;
    console.log(req.body);
    const createdTransaction = new Transaction({
        id,
        description,
        amount,
        category,
        date,
        creator: req.userData.userId
    });
    let user;
    try {
      user = await User.findById(req.userData.userId);
    } catch (err) {
      const error = new HttpError('Find by ID did not work, please try again', 500);
      return next(error);
    }
  
    if (!user) {
      const error = new HttpError('Could not find user for selected transaction', 404);
      return next(error);
    }

    if(user.id != req.userData.userId){
      const error = new HttpError('Authorization failed, could not create this transaction.', 401);
      return next(error);
    }



    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdTransaction.save({ session: sess });
        user.transactions.push(createdTransaction);
        await user.save({ session: sess });
        await sess.commitTransaction();
      } catch (err) {
        console.log(err);
        const error = new HttpError(
          'Creating transaction failed, please try again.',
          500
        );
        return next(error);
    };
    res.status(201).json({ message: 'Added Transaction', transaction: createdTransaction });
};

const deleteTransaction = async (req,res,next) => {
    const transactionId = req.body.transactionId;

    let transaction;
    try {
      transaction = await Transaction.findOne({ id : transactionId }).populate('creator');
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could find transaction to delete.',
        500
      );
      return next(error);
    }
    if (!transaction) {
        const error = new HttpError('Could not find transaction for this id.', 404);
        return next(error);
      }

      if(transaction.creator.id != req.userData.userId){
        const error = new HttpError('Authorization failed, could not delete this transaction.', 401);
        return next(error);
      }

      try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await transaction.remove({session: sess});
        transaction.creator.transactions.pull(transaction);
        await transaction.creator.save({session: sess});
        await sess.commitTransaction();
      } catch (err) {
        console.log(err);
        const error = new HttpError(
          'Something went wrong, could not delete Transaction.',
          500
        );
        return next(error);
      }
    res.status(200).json({ message: 'Deleted Transaction.' });  
};

exports.getTransactions = getTransactions;
exports.deleteTransaction = deleteTransaction;
exports.addTransactions = addTransaction;