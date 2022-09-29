const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    displayName: {
        type: String
    },
    username: {
        type: String
    },
    wallets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Wallet"
        }
    ]
})

module.exports = mongoose.model("User", userSchema)
