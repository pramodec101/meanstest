var mongoose = require('mongoose');

var CsvSchema = new mongoose.Schema({
 firstname: String,
 lastname: String,
 email: String,
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Csv', CsvSchema);