import NftModel from "../models/nftModel.js"
import {gql} from "apollo-server-express";
import Web3 from "web3"
import {ChainsInfo} from "../smart-config/config-chains.js";

export const nftTypeDefs = gql`
    type Nft {
      _id: ID
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
      isMarketPlace: Boolean
      price: Float
    }
    type Query {
        nfts: [Nft]
        filterNfts(collections: String, team: String, athlete: String, musician: String, artist: String, availability: String): [Nft]
        getNftsOfUser(creatorAddress: String): [Nft]
        searchNfts(key: String): [Nft]
    }
    type Mutation {
      createNft(name: String, tokenId: String, url: String, imageUrl: String, chainId: Int, network: String, collectionAddress: String, creatorAddress: String, collections: String, teams: String, athlete: String, musician: String, artist: String, availability: String): Nft
      putOnSale(collectionAddress: String, tokenId: String, isMarketPlace: Boolean, price: Float) : Nft
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
      collections !== "" ? filters.collections = collections.toLowerCase() : null;
      team !== "" ? filters.teams = team.toLowerCase() : null;
      athlete !== "" ? filters.athlete = athlete.toLowerCase() : null;
      musician !== "" ? filters.musician = musician.toLowerCase() : null;
      artist !== "" ? filters.artist = artist.toLowerCase() : null;
      availability !== "" ? filters.availability = availability.toLowerCase() : null;
      filters.isMarketPlace = true

      let data;
      await NftModel.aggregate([
        {
          $match: filters
        }
      ])
        .then((res) => {
          data = res
        })
        .catch((err) => {
          console.log(err)
        })
      console.log(ChainsInfo)
      return data;
    },

    getNftsOfUser: async (root, args) => {
      const nfts = await NftModel.find({creatorAddress: args.creatorAddress})
      return nfts
    },
    searchNfts: async (root, args) => {
      const key = args.key;
      const nfts = await NftModel.find({name: {$regex: key, $options: "i"}})
      return nfts;
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
        collectionAddress: args.collectionAddress,
        collections: args.collections,
        teams: args.teams,
        athlete: args.athlete,
        musician: args.musician,
        artist: args.artist,
        availability: args.availability
      })
      await nft.save()
      return nft;
    },

    putOnSale: async (root, args) => {
      let nft = NftModel.findOneAndUpdate({tokenId: args.tokenId, collectionAddress: args.collectionAddress}, {isMarketPlace: args.isMarketPlace, price: args.price});
      return nft;
    }
  }
}
