import { PublicKey } from "@solana/web3.js";
import { getFavoriteDomain as getFavDomain } from "@bonfida/spl-name-service";
import { RPC } from "@/content/endpoint";

export enum NoDomainCase {
    NoDomainInResponse = 'NoDomainInResponse',
    UserHasNoDomain = 'UserHasNoDomain',
    UnknownDomainError = 'UnknownDomainError'
}

export type FavoriteDomainResponse = 
    {has: true, domain: string} |
    {has: false, case: NoDomainCase};

// https://solana.stackexchange.com/questions/190/how-to-get-the-domain-name-for-a-public-key
export async function getFavoriteDomain(address: PublicKey): Promise<FavoriteDomainResponse> {
    try {
        const response = await getFavDomain(RPC, address);
        const {reverse} = response;
        console.log(`domain name for ${address.toBase58()} is`, reverse);
        if (reverse) {
            return {has: true, domain: `${reverse}.sol`};
        } else {
            console.log('weird case where we got a response but no domain name', response);
            return {has: false, case: NoDomainCase.NoDomainInResponse};
        }
    } catch (e) {
        const error: Error = e as any;
        if (error.message === 'Favourite domain not found') {
            return {has: false, case: NoDomainCase.UserHasNoDomain};
        } else {
            console.log(`Favorite domain error is unknown`);
            console.log(error.message);
            console.log(error);
            return {has: false, case: NoDomainCase.UnknownDomainError};
        }
    }
}