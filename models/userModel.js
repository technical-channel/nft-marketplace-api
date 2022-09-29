import mongoose from "mongoose"

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

export default mongoose.model("User", userSchema)
