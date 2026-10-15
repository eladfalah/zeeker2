const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String
  },
fileSize: {    
    type: Number
  },
createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Document', documentSchema);
