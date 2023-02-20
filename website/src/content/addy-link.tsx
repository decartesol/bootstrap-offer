import { PublicKey } from '@solana/web3.js';
import * as React from 'react';
import { useState } from '@/state/state';

export const AddyLink: React.FC<{address: PublicKey, showDomain?: boolean}> = ({address, showDomain}) => {
    const [solDomain, setSolDomain] = React.useState<string | undefined>(undefined);
    const {getDomain} = useState(({getDomain}) => ({getDomain}));
    const addyStr = address.toBase58();
    React.useEffect(() => {
        if (showDomain) {
            (async () => {
                if (typeof window === 'undefined') {
                    return;
                }
                setSolDomain(await getDomain(address));
            })();
        } else {
            setSolDomain(undefined);
        }
    }, [address, showDomain]);
    return <a href={`https://explorer.solana.com/address/${addyStr}`}>{solDomain || addyStr}</a>
}