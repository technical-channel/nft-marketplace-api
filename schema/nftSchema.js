import NftModel from "../models/nftModel.js"
import { gql } from "apollo-server-express";

export const nftTypeDefs = gql`
    type Nft {
      id: ID
      name: String
      tokenId: String,
      url: String,
      chainId: Int,
      network: String,
      collectionAddress: String
    }
    type Query {
        nfts: [Nft]
    }
    type Mutation {
      createNft(name: String, tokenId: String, url: String, chainId: Int, network: String, collectionAddress: String): Nft
    }
`

export const nftResolvers = {
  Query: {
    nfts: async () => {
      const data = await NftModel.find()
      return data
    }
  },
  Mutation: {
    createNft: async (root, args) => {
      let nft = new NftModel({
          name: args.name,
          tokenId: args.tokenId,
          url: args.url,
          chainId: args.chainId,
          network: args.network,
          collectionAddress: args.collectionAddress
      })
      await nft.save()
      return nft;
    }
  }
}
