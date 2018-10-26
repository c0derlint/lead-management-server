const mongoose = require('mongoose');

 const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    occupation: {
        type: String,
        required: true,
        trim: true
    },
    existing: { 
        type: Boolean, 
        default: false 
    },
    remarks: {
        type: String, 
        default: 'No remarks',
        trim: true
    }
});

module.exports = mongoose.model('User', userSchema);