import mongoose from "mongoose"

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
        imageUrl: {
            type: String,
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
        },
        creatorAddress: {
            type: String,
        },
        collections: {
            type: String,
            default: ""
        },
        teams: {
            type: String,
            default: ""
        },
        athlete: {
            type: String,
            default: ""
        },
        musician: {
            type: String,
            default: ""
        },
        artist: {
            type: String,
            default: ""
        },
        availability: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Nft", nftSchema)
