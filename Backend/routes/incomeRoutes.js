const express = require('express');
const { 
    addIncome,
    getAllIncomes,
    deleteIncome,
    downloadincomeexcel
} = require('../controllers/incomeController');
const {protect} = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/add', protect, addIncome);
router.get('/get', protect, getAllIncomes);
router.get('/downloadexcel', protect, downloadincomeexcel);
router.delete('/:id', protect, deleteIncome);


module.exports = router;