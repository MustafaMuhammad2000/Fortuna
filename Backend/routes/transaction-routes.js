const express = require('express');

const transactionControllers = require('../controllers/transaction-controllers')
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.use(checkAuth);
router.get('/all', transactionControllers.getTransactions);
router.post('/',transactionControllers.addTransactions);
router.delete('/', transactionControllers.deleteTransaction);
router.patch('/limit', transactionControllers.updateLimit);


module.exports = router;