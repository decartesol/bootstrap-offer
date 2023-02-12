import { PublicKey } from "@solana/web3.js";

export const HELIUS_KEY = process.env.NEXT_PUBLIC_HELIUS_KEY;
export const ADDRESS_STRING = "9Mi32KJbNY3U7kfB8A1Uv8KMukRBa6JKcMYLZSizS6g"
export const ADDRESS_PUBKEY = new PublicKey(ADDRESS_STRING);
export const TWITER_HANDLE = 'decartesol';
export const TWITTER_URL = `https://twitter.com/${TWITER_HANDLE}`;