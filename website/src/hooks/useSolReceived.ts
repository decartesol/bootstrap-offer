import { RPC } from "@/content/endpoint";
import { ADDRESS_PUBKEY, ADDRESS_STRING } from "@/utils/constants";
import { LAMPORTS_PER_SOL, ParsedTransactionWithMeta, SystemProgram } from "@solana/web3.js";
import BN from 'bn.js';
import * as React from 'react';

const TX_CACHE_KEY = 'tx-cache';
const IGNORE_SOURCE_ADDRESSES = new Set([
    "6uJksYpHzaGauqotdozG7RwHNX8Xg2BKtJPQwgmUWF9W", // Dev wallet
    ADDRESS_STRING, // Ignore self sends
]);
const CACHE_VERSION = "1";

const txsPromise = {
    promise: getSolSent()
}

async function getSolSent() {
    if (typeof window === "undefined") {
        return {total: -1, senders: {}};
    }
    const txSigs = (await RPC.getConfirmedSignaturesForAddress2(ADDRESS_PUBKEY, undefined, 'confirmed')).map(tx => tx.signature);
    if (localStorage.getItem(`${TX_CACHE_KEY}-version`) !== CACHE_VERSION) {
        localStorage.setItem(TX_CACHE_KEY, "{}");
        localStorage.setItem(`${TX_CACHE_KEY}-version`, CACHE_VERSION);
    }
    const cache: Record<string, Record<string, string>> = JSON.parse(localStorage.getItem(TX_CACHE_KEY)!);
    const newSigs: string[] = [];
    txSigs.forEach(txSig => {
        if (cache[txSig] === undefined)
            newSigs.push(txSig);
    });
    console.log(`Loaded   metadata for ${Object.keys(cache).length} txs from cache`);
    console.log(`Fetching metadata for ${newSigs.length} txs: ${JSON.stringify(newSigs)}`);
    const txsParsed = await RPC.getParsedTransactions(newSigs);
    const transfersIn: Record<string, BN> = {};
    Object.entries(cache).forEach(([tx, cachedTransfers]) => {
        Object.entries(cachedTransfers).forEach(([sender, sent]) => {
            if (transfersIn[sender] === undefined)
                transfersIn[sender] = new BN.BN(sent);
            else
                transfersIn[sender] = transfersIn[sender].add(new BN.BN(sent));
        });
    });
    const sigsMap = new Set(newSigs);
    txsParsed.forEach((tx, i) => {
        if (tx == null) return;
        const currentCache: Record<string, string> = {};
        if (tx.transaction.signatures.length < 1) {
            throw new Error(`Got a tx with ${tx.transaction.signatures.length} sigs`);
        }
        const txSig = tx.transaction.signatures[0];
        if (!sigsMap.has(txSig)) {
            throw new Error(`Tx sig ${txSig} is missing from transaction sigs. Sigs of tx are ${JSON.stringify(tx.transaction.signatures)}`);
        }
        for (const sigI in tx.transaction.signatures) {
            const sig = tx.transaction.signatures[sigI];
            if (sig === txSig) continue;
            if (sigsMap.has(sig)) {
                throw new Error(`Got unexpected sig ${sig} at index ${sigI} in ${JSON.stringify(tx.transaction.signatures)}`);
            }
        }
        tx.transaction.message.instructions.forEach((instruction, j) => {
            const {parsed, program, programId} = instruction as any;
            if (!SystemProgram.programId.equals(programId)) return;
            const {type, info} = parsed;
            if (type !== 'transfer') return;
            const {destination, source, lamports} = info;
            if (destination !== ADDRESS_STRING) return;
            if (IGNORE_SOURCE_ADDRESSES.has(source)) return;
            if (transfersIn[source] === undefined) {
                transfersIn[source] = new BN.BN(lamports);
            } else {
                transfersIn[source] = transfersIn[source].add(new BN.BN(lamports));
            }
            if (currentCache[source] === undefined) {
                currentCache[source] = (new BN.BN(lamports)).toString();
            } else {
                currentCache[source] = ((new BN.BN(currentCache[source])).add(new BN.BN(lamports))).toString();
            }
        });
        cache[txSig] = currentCache;
    });
    localStorage.setItem(TX_CACHE_KEY, JSON.stringify(cache));
    const senders = Object.entries(transfersIn);
    senders.sort(([aK, aV], [bK, bV]) => (bV.sub(aV)).toNumber());
    const total = Object.values(transfersIn).reduce((accumulated, curr) => accumulated.add(curr), new BN.BN(0));
    console.log(`${total.toNumber() / LAMPORTS_PER_SOL} SOL collected from ${senders.length} addresses`);
    senders.forEach(([sender, amount], i) => {
        console.log(`${sender} sent ${amount.toNumber() / LAMPORTS_PER_SOL}`);
    });
    return {total: total.toNumber() / LAMPORTS_PER_SOL, senders: Object.fromEntries(senders)};
};

export const useSolReceived = () => {
    const [received, setReceived] = React.useState(-1);
    const [senders, setSenders] = React.useState<Record<string, BN>>({});
    React.useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }
        (async () => {
            const {total, senders} = await txsPromise.promise;
            setReceived(total);
            setSenders(senders);
        })();
    }, []);
    return {received, senders};
}