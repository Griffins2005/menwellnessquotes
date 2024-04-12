const express = require('express');
const router = express.Router();
const { getQuotes, addQuote, deleteQuote, updateQuote } = require('./controllers'); // Import updateQuote

router.get('/quotes', getQuotes);
router.post('/quotes', addQuote);
router.delete('/quotes/:id', deleteQuote);
router.put('/quotes/:id', updateQuote); // Add route for updating a quote

module.exports = router;
