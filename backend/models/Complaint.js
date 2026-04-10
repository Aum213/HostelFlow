const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  ticketId: { 
    type: String, 
    required: true, 
    unique: true 
  }, // To keep your cool 4-digit IDs
  hostel: { 
    type: String, 
    required: true 
  },
  roomNumber: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Resolved'], 
    default: 'Pending' 
  },
  studentName: { 
    type: String, 
    required: true 
  },
  studentEmail: { 
    type: String, 
    required: true 
  },
  date: { 
    type: String, 
    default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);