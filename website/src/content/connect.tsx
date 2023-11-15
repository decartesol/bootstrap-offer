import * as React from 'react';
import Image from 'next/image';
import { BASE_PATH, ADDRESS_PUBKEY } from '@/utils/constants';
import { PublicKey, Transaction, TransactionMessage, VersionedTransaction } from '@solana/web3.js';
import bs58 from 'bs58';
import { RPC } from './endpoint';

const ANIMATION_DURATION = 1000;
const SIDE_PADDING = 30;

export enum SignAndSendErrorCode {
    NotImplemented = 'NotImplemented',
    UnknownError = 'UnknownError',
    NotConnected = 'NotConnected'
}

export type SignAndSendResult = 
    {success: true; sig: string;} |
    {success: false; sig?: string; errorCode: SignAndSendErrorCode, errorMsg: string};

export type SignAndSendFn = (tx: Transaction) => Promise<SignAndSendResult>;

export type ConnectToWalletProps = {
    onClose: () => void,
    open: boolean,
    onConnect: (conncectAs: PublicKey, signAndSendTx: SignAndSendFn) => void
}

let eventFired = false;
function fireEvent(event: () => void) {
    if (!eventFired) event();
    eventFired = true;
    setTimeout(() => { eventFired = false; });
}

export const ConnectToWallet: React.FC<ConnectToWalletProps> = ({onClose, open, onConnect}) => {
    const [computedOpen, setComputedOpen] = React.useState(open);
    const [phantomPresent, setPhantomIsPresent] = React.useState(false);
    const [solflarePresent, setSolflareIsPresent] = React.useState(false);

    function isPhantomPresent() {
        const PHANTOM = (typeof window !== 'undefined') ? (window as any).phantom : undefined;
        const IS_PHANTOM_PRESENT = PHANTOM !== undefined;
        return IS_PHANTOM_PRESENT;
    }

    function isSolflarePresent() {
        if (typeof window === 'undefined') return false;
        const solflare = (window as any).solflare;
        return solflare && solflare.isSolflare;
    }

    React.useEffect(() => {
        const isPresent = isPhantomPresent();
        setPhantomIsPresent(isPresent);
        const solflarePres = isSolflarePresent();
        setSolflareIsPresent(solflarePres);
    }, []);

    React.useEffect(() => {
        if (open) {
            document.documentElement.setAttribute('class', 'modal-is-open modal-is-opening');
            setComputedOpen(true);
            setTimeout(() => {
                document.documentElement.setAttribute('class', 'modal-is-open');
            }, ANIMATION_DURATION);
        } else {
            document.documentElement.setAttribute('class', 'modal-is-open modal-is-closing');
            setTimeout(() => {
                document.documentElement.removeAttribute('class');
                setComputedOpen(false);
            }, ANIMATION_DURATION);
        }
    }, [open]);

    async function connectSolflare() {
        if (!isSolflarePresent()) {
            window.open('https://solflare.com', '_blank');
            return;
        }
        const provider = (window as any).solflare;
        // https://docs.solflare.com/solflare/technical/integrate-solflare/with-the-wallet-adapter
        async function connect() {
            const connected = await provider.connect();
            console.log(`got solflare connect result`, connected);
            if (connected) {
                const pk = provider.publicKey;
                onConnect(pk, solflareSignSend);
                onClose();
            }
        }
        provider.on('accountChanged', async (...args: any[]) => {
            fireEvent(async () => {
                console.log('account changed', args);
                await connect();
            });  
        })
        await connect();
    }

    async function solflareSignSend(tx: Transaction): Promise<SignAndSendResult> {
        try {
            const provider = (window as any).solflare;
            const connected = await provider.connect();
            if (!connected) return {success: false, errorCode: SignAndSendErrorCode.NotConnected, errorMsg: 'solflare not connected'};
            const publicKey = provider.publicKey as PublicKey;
            const recent = await RPC.getLatestBlockhash();
            tx.recentBlockhash = recent.blockhash;
            tx.feePayer = publicKey;
            let signed = await provider.signTransaction(tx);
            console.log('solflare signed', signed);
            let txid = await RPC.sendRawTransaction(signed.serialize());
            console.log('solflare sent', txid);
            const { blockhash, lastValidBlockHeight } = await RPC.getLatestBlockhash();
            await RPC.confirmTransaction({blockhash, lastValidBlockHeight, signature: txid});
            return {success: true, sig: txid};
        } catch (e) {
            console.log('solflare send error', e);
            return {success: false, errorCode: SignAndSendErrorCode.UnknownError, errorMsg: (e as Error).message};
        }
    }

    async function connectPhantom() {
        if (!isPhantomPresent()) {
            window.open("https://phantom.app/", "_blank");
            return;
        }
        const PHANTOM = (window as any).phantom;
        const provider = PHANTOM.solana;
        async function connect() {
            let pk: PublicKey | undefined;
            try {
                const connectResult = await provider.connect();
                pk = connectResult.publicKey;
            } catch(e) {
                console.log('got error when trying to connect');
                console.log(e);
            }
            if (pk === undefined) return;
            onConnect(pk, phantomSignSend);
            onClose();
        }
        provider.on('accountChanged', (newPk: PublicKey) => {
            if (newPk) {
                console.log(`account changed to`, newPk.toBase58());
                onConnect(newPk, phantomSignSend);
            } else {
                console.log(`account changed w/ no new pk`);
                connect();
            }
        });
        await connect();
    }

    async function phantomSignSend(tx: Transaction): Promise<SignAndSendResult> {
        try {
            const PHANTOM = (window as any).phantom;
            const provider = PHANTOM.solana;
            const {publicKey} = await provider.connect();
            const recent = await RPC.getLatestBlockhash();
            // https://docs.phantom.app/solana/sending-a-transaction-1
            const txMsg = new TransactionMessage({
                payerKey: publicKey,
                recentBlockhash: recent.blockhash,
                instructions: tx.instructions
            }).compileToV0Message();
            const versionedTx = new VersionedTransaction(txMsg);
            type SignAndSendRes = {
                publicKey: string;
                signature: string;
            }
            const { publicKey: pk, signature: sig }: SignAndSendRes = await provider.signAndSendTransaction(versionedTx);
            console.log('got signed', pk, sig);
            const { blockhash, lastValidBlockHeight } = await RPC.getLatestBlockhash();
            await RPC.confirmTransaction({blockhash, lastValidBlockHeight, signature: sig});
            return {success: true, sig};
        } catch(e) {
            console.log('phantom send error', e);
            return {success: false, errorCode: SignAndSendErrorCode.UnknownError, errorMsg: (e as Error).message};
        }
    }
    return (
        <dialog id="modal-example" open={computedOpen}>
            <article style={{padding: `40px ${SIDE_PADDING}px 20px ${SIDE_PADDING}px`, width: 350}}>
                <section className="container" style={{marginBottom: 0, width: '100%'}}>
                    <button className={solflarePresent ? 'contrast' : 'secondary'} onClick={e => { e.preventDefault(); connectSolflare(); }} style={{position: 'relative'}}>
                        <ButtonLogo path={`${BASE_PATH}/solflare.png`} name='Solflare' />
                        Solflare
                    </button>
                    <button className={phantomPresent ? 'contrast' : 'secondary'} onClick={e => { e.preventDefault(); connectPhantom(); }} style={{position: 'relative'}}>
                        <ButtonLogo path={`${BASE_PATH}/phantom.png`} name='Phantom' />
                        Phantom
                    </button>
                    <button onClick={e => { e.preventDefault(); onClose(); }} >
                        Close
                    </button>
                </section>
            </article>
        </dialog>
    )
}

const BUTTON_LOGO_SIZE = 30;

const ButtonLogo: React.FC<{path: string, name: string}> = ({path, name}) => {
    return (
        <div style={{position: 'absolute', left: (BUTTON_LOGO_SIZE/2), top: '50%', marginTop: `-${(BUTTON_LOGO_SIZE/2)}px`}}>
            <Image src={path} height={BUTTON_LOGO_SIZE} width={BUTTON_LOGO_SIZE} alt={name} />
        </div>
    )
}