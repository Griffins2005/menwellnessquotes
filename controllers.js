const { Quote } = require('./models');

const getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addQuote = async (req, res) => {
  const { topic, quote, author } = req.body; // Update to get topic, quote, and author from request body

  const newQuote = new Quote({
    topic,
    quote,
    author
  });

  try {
    const savedQuote = await newQuote.save(); // Change variable name for clarity
    res.status(201).json(savedQuote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteQuote = async (req, res) => {
  try {
    const deletedQuote = await Quote.findByIdAndDelete(req.params.id);
    if (!deletedQuote) res.status(404).send('Quote not found');
    res.status(200).send('Quote deleted successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateQuote = async (req, res) => {
  const { id } = req.params;
  const { topic, quote, author } = req.body;

  try {
    const updatedQuote = await Quote.findByIdAndUpdate(id, { topic, quote, author }, { new: true });
    if (!updatedQuote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.json(updatedQuote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getQuotes,
  addQuote,
  deleteQuote,
  updateQuote // Add updateQuote to exports
};
