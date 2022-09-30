import { gql } from "apollo-server-express";
import abi from "../Contracts/Abi/abi.json" assert { type: "json" };
import Web3 from "web3";

const CONTRACT_ADDRESS = "0xbd5fb504d4482ef4366dfa0c0edfb85ed50a9bbb"

export const nftActivityTypeDefs = gql`
  type ReturnValues {
    from: String
    to: String
    tokenId: Int
  }

  type NftActivity {
    address: String
    blockNumber: Int
    event: String
    transactionHash: String
    returnValues: ReturnValues
  }

  type Query {
    activity(contractAddress: String, network: String, tokenId: Int): [NftActivity]
  }
`

export const nftActivityResolvers = {
  Query: {
    activity: async (root, args) => {

      let RPC_URL;
      if(args.network === "ethereum"){
        RPC_URL = "https://mainnet.infura.io/v3/9c48d1f781404552b1a017d597f6bee1"
      }

      const web3_ = new Web3(RPC_URL)

      const contract = new web3_.eth.Contract(abi, args.contractAddress);
      let response = []
      await contract.getPastEvents("Transfer", {
          filter: {
            tokenId: args.tokenId
          },
          fromBlock: 0,
          toBlock: "latest"
      })
      .then((data) => {
        response = data
      });
      return response
    }
  },
}
