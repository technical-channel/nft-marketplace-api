import { userTypeDefs, userResolvers } from "./userSchema.js";
import { nftTypeDefs, nftResolvers } from "./nftSchema.js";
import { nftActivityTypeDefs, nftActivityResolvers } from "./nftActivitySchema.js";

import {mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge"

const types = [userTypeDefs, nftTypeDefs, nftActivityTypeDefs];
const resolv = [userResolvers, nftResolvers, nftActivityResolvers];

export const typeDefs = mergeTypeDefs(types)
export const resolvers = mergeResolvers(resolv)
