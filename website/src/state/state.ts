import { PublicKey } from '@solana/web3.js';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getFavoriteDomain } from './get-fav-domain';

const SNS_CACHE_DURATION = 24 * 60 * 60 * 1000; // One day

export type SNSCacheEntry = {
    address: string;
    domainName: string | null;
    expiresAt: string
}

export type State = {
    snsCache: Record<string, SNSCacheEntry>;
    getDomain: (pk: PublicKey) => Promise<string | undefined>;
}

export const useState = create<State>()(
    persist(
        (set, get) => ({
            snsCache: {},
            async getDomain(pk) {
                const snsCache: State['snsCache'] = {...(get().snsCache)};
                const addy = pk.toBase58();
                let cacheUpdated = false;
                if (snsCache[addy] !== undefined) {
                    const item = snsCache[addy];
                    let expiry: Date | undefined;
                    try {
                        expiry = new Date(item.expiresAt);
                    } catch(e) {
                        console.log(`Failed to parse expiry for ${addy}`);
                        console.log(e);
                    }
                    if (expiry === undefined) {
                        // Error parsing expiry. Evict item.
                        delete snsCache[addy];
                        cacheUpdated = true;
                    } else if (Date.now() > expiry.getTime()) {
                        // Cache item expired. Evict.
                        delete snsCache[addy];
                        cacheUpdated = true;
                    } else if (item.address !== addy) {
                        console.log(`Cache mistmach. key is ${addy} value is ${item.address}`);
                        delete snsCache[addy];
                        cacheUpdated = true;
                    } else {
                        const domainName = item.domainName;
                        if (domainName == null) {
                            return undefined;
                        }
                        return domainName;
                    }
                }
                if (cacheUpdated) {
                    set({snsCache});
                }
                if (snsCache[addy] !== undefined) {
                    throw new Error("Unexpected state, cache item present");
                }
                const maybeDomain = await getFavoriteDomain(pk);
                const expiry = new Date(Date.now() + SNS_CACHE_DURATION);
                snsCache[addy] = {
                    expiresAt: expiry.toUTCString(),
                    address: addy,
                    domainName: maybeDomain.has ? maybeDomain.domain : null
                };
                set({snsCache});
                return maybeDomain.has ? maybeDomain.domain : undefined;
            }
        }),
        {
            name: 'spa-store'
        }
    )
)