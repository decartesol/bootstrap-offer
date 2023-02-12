import { HELIUS_KEY } from '@/utils/constants';
import { Connection, Commitment, PublicKey } from '@solana/web3.js';

const endpoint = `https://rpc.helius.xyz/?api-key=${HELIUS_KEY}`;
const dataCommitment: Commitment = 'confirmed';
export const RPC = new Connection(endpoint, dataCommitment);