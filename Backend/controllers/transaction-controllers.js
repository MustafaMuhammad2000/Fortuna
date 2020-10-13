const mongoose = require('mongoose');


const HttpError = require('../models/http-error');
const Transaction = require('../models/transaction_schema');
const User = require('../models/user_schema');


const getTransactions = async (req, res, next) => {
    const userId = req.body.user;
    console.log(userId);
    let userWithTransactions;
  try {
    userWithTransactions = await User.findById(userId).populate('transactions');
  } catch (err) {
    const error = new HttpError(
      'Fetching places failed, please try again later',
      500
    );
    return next(error);
  }
  if (!userWithTransactions || userWithTransactions.transactions.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user id.', 404)
    );
  }

  res.json({
    transactions: userWithTransactions.transactions.map(transaction =>
      transaction.toObject({ getters: true })
    )
  });
};

const addTransaction = async (req,res,next) =>{
    const {id, description, amount, category, creator} = req.body;
    const createdTransaction = new Transaction({
        id,
        description,
        amount,
        category,
        creator,
    });

    let user;
    try {
      user = await User.findById(creator);
    } catch (err) {
      const error = new HttpError('Creating place failed, please try again', 500);
      return next(error);
    }
  
    if (!user) {
      const error = new HttpError('Could not find user for provided id', 404);
      return next(error);
    }

    console.log(user);

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdTransaction.save({ session: sess });
        user.transactions.push(createdPlace);
        await user.save({ session: sess });
        await sess.commitTransaction();
      } catch (err) {
        const error = new HttpError(
          'Creating place failed, please try again.',
          500
        );
        return next(error);
    };
    res.status(201).json({ place: createdPlace });
};

const deleteTransaction = async (req,res,next) => {
    const transactionId = req.body.id;
    console.log(transactionId);

    let transaction;
    try {
      transaction = await Transaction.findById(transactionId).populate('creator');
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete place.',
        500
      );
      return next(error);
    }
    if (!transaction) {
        const error = new HttpError('Could not find place for this id.', 404);
        return next(error);
      }

      try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await transaction.remove({ session: sess });
        transaction.creator.transactions.pull(place);
        await transaction.creator.save({ session: sess });
        await sess.commitTransaction();
      } catch (err) {
        const error = new HttpError(
          'Something went wrong, could not delete place.',
          500
        );
        return next(error);
      }
    res.status(200).json({ message: 'Deleted place.' });  
};

exports.getTransactions = getTransactions;
exports.deleteTransaction = deleteTransaction;
exports.addTransactions = addTransaction;