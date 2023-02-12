import { getFavoriteDomain } from "@bonfida/spl-name-service";
import { PublicKey } from '@solana/web3.js';
import * as React from 'react';
import { RPC } from '@/content/endpoint';

const DOMAIN_CACHE_KEY = "sns-cache";

export const AddyLink: React.FC<{address: PublicKey, showDomain?: boolean}> = ({address, showDomain}) => {
    const [solDomain, setSolDomain] = React.useState<string | undefined>(undefined);
    const addyStr = address.toBase58();
    React.useEffect(() => {
        if (showDomain) {
            (async () => {
                if (typeof window === 'undefined') {
                    return;
                }
                if (localStorage.getItem(DOMAIN_CACHE_KEY) == null)
                    localStorage.setItem(DOMAIN_CACHE_KEY, "{}");
                const cache = JSON.parse(localStorage.getItem(DOMAIN_CACHE_KEY)!);
                if (cache[addyStr] !== undefined) {
                    setSolDomain(cache[addyStr]);
                    return;
                }
                const k = addyStr;
                function updateCache(value: string) {
                    cache[k] = value;
                    localStorage.setItem(DOMAIN_CACHE_KEY, JSON.stringify(cache));
                }
                // https://solana.stackexchange.com/questions/190/how-to-get-the-domain-name-for-a-public-key
                try {
                    const addressFromStr = new PublicKey(addyStr);
                    const {domain, reverse} = await getFavoriteDomain(RPC, addressFromStr);
                    console.log(`domain name for ${addyStr} is`, reverse);
                    if (reverse) {
                        const fetchedDomain = `${reverse}.sol`
                        setSolDomain(fetchedDomain);
                        updateCache(fetchedDomain);
                    }
                } catch (e) {
                    const error: Error = e as any;
                    if (error.message === 'Favourite domain not found') {
                        updateCache(addyStr);
                    } else {
                        console.log(`error is unknown`);
                        console.log(error.message);
                        console.log(error);
                    }
                }
            })();
        } else {
            setSolDomain(undefined);
        }
    }, [addyStr, showDomain]);
    return <a href={`https://explorer.solana.com/address/${addyStr}`}>{solDomain || addyStr}</a>
}