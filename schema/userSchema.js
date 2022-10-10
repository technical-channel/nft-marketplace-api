import UserModel from "../models/userModel.js"
import WalletModel from "../models/walletModel.js"
import {gql} from "apollo-server-express";

export const userTypeDefs = gql`
    type User {
      id: ID
      displayName: String
      username: String
      wallets: [Wallet]
    }

    type Wallet {
      id: ID
      address: String
      isPrimary: Boolean
      user: User
    }

    type Query {
      users: [User]
      user(id: ID): User
      wallets: [Wallet]
      wallet(address: String): Wallet
      signIn(walletAddress: String): Wallet
    }

    type Mutation {
      signUp(displayName: String, username: String, walletAddress: String): User
      linkWallet(walletAddress: String, userId: String): Wallet
    }
`

export const userResolvers = {
  Query: {
    users: async () => {
      const data = await UserModel.find().populate("wallets")
      return data;
    },

    user: async (root, args) => {
      const data = await UserModel.findById(args.id)
      return data;
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
    }
  }
}
