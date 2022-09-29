import { userTypeDefs, userResolvers } from "./userSchema.js";
import { nftTypeDefs, nftResolvers } from "./nftSchema.js";

import {mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge"

const types = [userTypeDefs, nftTypeDefs];
const resolv = [userResolvers, nftResolvers];

export const typeDefs = mergeTypeDefs(types)
export const resolvers = mergeResolvers(resolv)
