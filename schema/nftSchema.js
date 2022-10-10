import NftModel from "../models/nftModel.js"
import {gql} from "apollo-server-express";

export const nftTypeDefs = gql`
    type Nft {
      id: ID
      name: String
      tokenId: String
      url: String
      chainId: Int
      network: String
      collectionAddress: String
      creatorAddress: String
      imageUrl: String
      collections: String
      teams: String
      athlete: String
      musician: String
      artist: String
      availability: String
    }
    type Query {
        nfts: [Nft]
        filterNfts(collections: String, team: String, athlete: String, musician: String, artist: String, availability: String): [Nft]
    }
    type Mutation {
      createNft(name: String, tokenId: String, url: String, imageUrl: String, chainId: Int, network: String, collectionAddress: String, creatorAddress: String): Nft
    }
`

export const nftResolvers = {
  Query: {
    nfts: async () => {
      const data = await NftModel.find()
      return data;
    },
    filterNfts: async (root, args) => {
      const collections = args.collections
      const team = args.team
      const athlete = args.athlete
      const musician = args.musician
      const artist = args.artist
      const availability = args.availability

      const filters = {}
      collections !== "" ? filters.collections = collections : null;
      team !== "" ? filters.team = team : null;
      athlete !== "" ? filters.athlete = athlete : null;
      musician !== "" ? filters.musician = musician : null;
      artist !== "" ? filters.artist = artist : null;
      availability !== "" ? filters.availability = availability : null;

      await NftModel.aggregate([
        {
          $match: filters
        }
      ]).then((res) => {
        return res;
      })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  Mutation: {
    createNft: async (root, args) => {
      let nft = new NftModel({
        name: args.name,
        tokenId: args.tokenId,
        url: args.url,
        imageUrl: args.imageUrl,
        creatorAddress: args.creatorAddress,
        chainId: args.chainId,
        network: args.network,
        collectionAddress: args.collectionAddress
      })
      await nft.save()
      return nft;
    }
  }
}
