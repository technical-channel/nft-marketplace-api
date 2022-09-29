const mongoose = require("mongoose")

const nftSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        tokenId: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        chainId: {
            type: Number,
            required: true
        },
        network: {
            type: String,
            required: true
        },
        collectionAddress: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Nft", nftSchema)
