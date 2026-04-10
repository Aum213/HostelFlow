const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  content: { 
    type: String, 
    required: true 
  },
  postedBy: { 
    type: String, 
    default: 'Administration Office' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);