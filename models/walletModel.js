const mongoose = require("mongoose")

const walletSchema = mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: true
    },
    isPrimary: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Wallet", walletSchema);
