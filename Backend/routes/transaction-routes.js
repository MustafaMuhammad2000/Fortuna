const express = require('express');

const transactionControllers = require('../controllers/transaction-controllers')

const router = express.Router();


router.get('/', transactionControllers.getTransactions);
router.post('/',transactionControllers.addTransactions);
router.get('/:tid', transactionControllers.deleteTransaction);


module.exports = router;