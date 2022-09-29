const express = require("express")
const router = express();

const NFT = require("../models/nftModel");

router.get("/", async (req, res) => {
    await NFT.find()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post("/", async (req, res) => {
    let nft = new NFT(req.body)
    await nft.save()
        .then((data) => {
            return res.send(data)
        })
        .catch((err) => {
            return res.send(err)
        })
})

module.exports = router;
