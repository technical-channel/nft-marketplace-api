import express from "express"
import abi from "../Contracts/Abi/abi.json" assert { type: "json" };
import { ethers } from "ethers";
const router = express();

import Web3 from "web3"

const FROM_ADDRESS = "0xc73b17179bf0c59cd5860bb25247d1d1092c1088"
const CONTRACT_ADDRESS = "0xbd5fb504d4482ef4366dfa0c0edfb85ed50a9bbb"
const web3_ = new Web3("https://mainnet.infura.io/v3/9c48d1f781404552b1a017d597f6bee1")

const contract = new web3_.eth.Contract(abi, CONTRACT_ADDRESS);

router.get("/", async (req, res) => {
    const name = await contract.getPastEvents("Transfer", {
        filter: {
          // from: "0xf6b5F6B9F1624C6426d0A0bb1eBe7D8dBff1F9a3",
          tokenId: 4636
        },
        fromBlock: 0,
        toBlock: "latest"
    }, function(error, events){ console.log(events); }).then((data) => {
      return res.json(data)
    });
})

export default router
