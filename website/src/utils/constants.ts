import { PublicKey } from "@solana/web3.js";
import {basePath} from '../../next.config';

export const HELIUS_KEY = process.env.NEXT_PUBLIC_HELIUS_KEY || '5962c4a2-f7d8-45e2-8444-fdbe1f4b09a8'
export const ADDRESS_STRING = "9Mi32KJbNY3U7kfB8A1Uv8KMukRBa6JKcMYLZSizS6g"
export const ADDRESS_PUBKEY = new PublicKey(ADDRESS_STRING);
export const TWITER_HANDLE = 'decartesol';
export const TWITTER_URL = `https://twitter.com/${TWITER_HANDLE}`;
export const BASE_PATH = basePath;
export const GITHUB_URL = 'https://github.com/devise-labs/monorepo';
