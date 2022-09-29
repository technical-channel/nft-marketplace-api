const Nft = require("../models/nftModel")
const User = require("../models/userModel")
const Wallet = require("../models/walletModel")

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean,GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLScalarType} = require("graphql");

const NftType = new GraphQLObjectType({
    name: "Nft",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        tokenId: {type: GraphQLString},
        url: {type: GraphQLString},
        chainId: {type: GraphQLString},
        network: {type: GraphQLString},
        collectionAddress: {type: GraphQLString},
    })
});

const WalletType = new GraphQLObjectType({
    name: "Wallet",
    fields: () => ({
        id: {type: GraphQLID},
        address: {type: GraphQLString},
        isPrimary: {type: GraphQLBoolean},
        user: {
            type: UserType,
            resolve(parent, args){
                return User.findOne(parent.user._id)
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type: GraphQLID},
        displayName: {type: GraphQLString},
        username: {type: GraphQLString},
        wallets: {
            type: new GraphQLList(WalletType),
            resolve(parent, args){
                return Wallet.find({user: parent.id})
            }
        },
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({})
            }
        },
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return User.findById(args.id)
            }
        },
        wallets: {
            type: new GraphQLList(WalletType),
            resolve(parent, args) {
                return Wallet.find()
            }
        },
        wallet: {
            type: WalletType,
            args: {address: {type: GraphQLString}},
            resolve(parent, args){
                return Wallet.findOne({address: args.address})
            }
        },
        nfts: {
            type: new GraphQLList(NftType),
            resolve(parent, args) {
                return Nft.find()
            }
        },
        nft: {
            type: NftType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Nft.findById(args.id)
            }
        },
        signIn: {
            type: WalletType,
            args: {
                walletAddress: {type: GraphQLString},
            },
            resolve(parent, args){
                return Wallet.findOne({address: args.walletAddress})
            }

        }
    },
});

//Mutations
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        signUp:{
            type: UserType,
            args: {
                displayName: {type: GraphQLNonNull(GraphQLString)},
                username: {type: GraphQLNonNull(GraphQLString)},
                walletAddress: {type: GraphQLNonNull(GraphQLString)},
            },
            async resolve(parent, args){
                const user = new User({
                    displayName: args.displayName,
                    username: args.username,
                    wallets: []
                })

                const existingWallet = await Wallet.findOne({address: args.walletAddress})

                const wallet = new Wallet({
                    address: args.walletAddress,
                    isPrimary: true
                })

                user.wallets.push(wallet)
                if(existingWallet){
                    throw new Error("Wallet Already exists")
                }
                else{
                    user.save().then(() => {
                        wallet.user = user
                        wallet.save()
                    })
                    return user;
                }
            }
        },
        
        linkWallet: {
            type: WalletType,
            args: {
                walletAddress: {type: GraphQLNonNull(GraphQLString)},
                userId: {type: GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args){
                const existingWallet = await Wallet.findOne({address: args.walletAddress})
                const user = await User.findById(args.userId)
                if(!user){
                    throw new Error("User does not exist")
                }
                else{
                    if(existingWallet){
                        throw new Error("Wallet Already exists")
                    }
                    else{
                        const newWallet = new Wallet({
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
        },

        createNft: {
            type: NftType,
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString)
                },
                tokenId: {
                    type: GraphQLNonNull(GraphQLString)
                },
                url: {
                    type: GraphQLNonNull(GraphQLString)
                },
                chainId: {
                    type: GraphQLNonNull(GraphQLString)
                },
                network: {
                    type: GraphQLNonNull(GraphQLString)
                },
                collectionAddress: {
                    type: GraphQLNonNull(GraphQLString)
                }
            },
            async resolve(parent, args){
                let nft = new Nft({
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
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})
