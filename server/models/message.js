const mongoose = require('mongoose');
require('../db/mongoose');

const messageSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const MessageModel = mongoose.model('MessageModel', messageSchema);

module.exports = MessageModel;