const mongoose = require('mongoose');
const User = require("../models/User")
const ProductSchema = mongoose.Schema({
    product_name:
    {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    is_active: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);