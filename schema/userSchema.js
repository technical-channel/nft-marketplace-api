import UserModel from "../models/userModel.js"
import WalletModel from "../models/walletModel.js"
import {gql} from "apollo-server-express";

export const userTypeDefs = gql`
    type User {
      _id: ID
      displayName: String
      username: String
      avatar_url: String
      about_details: String
      bg_image: String
      twitterUrl: String
      facebookUrl: String
      wallets: [Wallet]
    }

    type Wallet {
      _id: ID
      address: String
      isPrimary: Boolean
      user: User
    }

    type Query {
      users: [User]
      user(walletAddress: String): Wallet
      wallets: [Wallet]
      wallet(address: String): Wallet
      signIn(walletAddress: String): Wallet
    }

    type Mutation {
      signUp(displayName: String, username: String, walletAddress: String): User
      linkWallet(walletAddress: String, userId: String): Wallet
      updateUser(
        userId: String,
        displayName: String,
        username: String,
        avatar_url: String,
        about_details: String,
        bg_image: String,
        twitterUrl: String,
        facebookUrl: String
      ) : User
    }
`

export const userResolvers = {
  Query: {
    users: async () => {
      const data = await UserModel.findOne().populate("wallets")
      return data;
    },

    user: async (root, args) => {
      //const data = await WalletModel.findOne({wallets: {$in: [args.walletAddress]}})
      const data = await WalletModel.findOne({address: args.walletAddress}).populate("user")
      console.log(data)
      return data
    },

    wallets: async () => {
      const data = await WalletModel.find()
      return data
    },

    wallet: async (root, args) => {
      const data = await WalletModel.findOne({address: args.address})
      return data
    },

    signIn: async (root, args) => {
      const data = await WalletModel.findOne({address: args.walletAddress}).populate()
      return data
    },
  },

  Mutation: {
    signUp: async (root, args) => {
      const user = new UserModel({
        displayName: args.displayName,
        username: args.username,
        avatar_url: args.avatar_url,
        about_details: args.about_details,
        bg_image: args.bg_image,
        twitterUrl: args.twitterUrl,
        facebookUrl: args.facebookUrl,
        wallets: []
      })
      const existingWallet = await WalletModel.findOne({address: args.walletAddress})
      const wallet = new WalletModel({
        address: args.walletAddress,
        isPrimary: true
      })
      user.wallets.push(wallet)
      if (existingWallet) {
        throw new Error("Wallet Already exists")
      }
      else {
        user.save().then(() => {
          wallet.user = user
          wallet.save()
        })
        return user;
      }
    },

    linkWallet: async (root, args) => {
      const existingWallet = await WalletModel.findOne({address: args.walletAddress})
      const user = await UserModel.findById(args.userId)
      if (!user) {
        throw new Error("User does not exist")
      }
      else {
        if (existingWallet) {
          throw new Error("Wallet Already exists")
        }
        else {
          const newWallet = new WalletModel({
            address: args.walletAddress,
            isPrimary: false,
            user: user
          })
          user.wallets.push(newWallet)
          user.save()
          newWallet.save()
          return newWallet;
        }
      }
    },

    updateUser: async (root, args) => {
      const user = UserModel.findByIdAndUpdate(args.userId, args)
      return user;
    },
  }
}
