import { ADDRESS_PUBKEY, TWITTER_URL } from '@/utils/constants';
import * as React from 'react';
import { AddyLink } from './addy-link';
import { FOR_SOL, PERCENT_GIVEAWAY, TOTAL_SUPPLY } from './calculator';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Disclaimer } from './disclaimer';
import { ConnectToWallet, SignAndSendErrorCode, SignAndSendFn } from './connect';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js';
import { useState } from '@/state/state';

const MIN_SEND = .1;
const MAX_SEND = 5;

const INIT_SIGN_AND_SEND: SignAndSendFn = 
    async () => ({success: false, errorCode: SignAndSendErrorCode.NotImplemented, errorMsg: 'this is the initial sign and send'});

export const Header: React.FC = () => {
    const [send, setSend] = React.useState(1);
    const [connectedAs, setConnectedAs] = React.useState<undefined | PublicKey>(undefined);
    const {getDomain} = useState(({getDomain}) => ({getDomain}));
    const receive = Math.round((send / FOR_SOL) * (PERCENT_GIVEAWAY * TOTAL_SUPPLY) * 100) / 100;
    const [connectOpen, setConnectOpen] = React.useState(false);
    const [connectedAsDisplay, setConnectedAsDisplay] = React.useState('');
    const [{signAndSend}, setSignAndSend] = React.useState<{signAndSend: SignAndSendFn}>({signAndSend: INIT_SIGN_AND_SEND});
    React.useEffect(() => {
        if (connectedAs === undefined) return;
        (async () => {
            const domain = await getDomain(connectedAs);
            if (domain === undefined) {
                setConnectedAsDisplay(connectedAs.toBase58().substring(0, 6) + '...');
            } else {
                setConnectedAsDisplay(domain);
            }
        })();
    }, [connectedAs]);
    async function submitSend() {
        if (connectedAs === undefined) return;
        if (send <= 0) return;
        const tx: Transaction = new Transaction();
        const ix: TransactionInstruction = SystemProgram.transfer({
            fromPubkey: connectedAs,
            toPubkey: ADDRESS_PUBKEY,
            lamports: send * LAMPORTS_PER_SOL
        });
        tx.add(ix);
        const result = await signAndSend(tx);
        if (result.success) {
            console.log(`Send succeeded: ${result.sig}`);
        } else {
            console.log(`Send failed: ${result.sig}`);
            console.log(`${result.errorCode}:`, result.errorMsg);
        }
    }
    return (
        <div className="hero" data-theme="dark">
            <header className="container">
                <hgroup>
                    <h1>Bootstrap <AddyLink address={ADDRESS_PUBKEY} showDomain={true} /> <a className='fa fa-twitter' href={TWITTER_URL}></a></h1>
                    <h2>
                        Hi, I'm decartes.sol, a SWE with over a decade of programming & system design experience.<br />
                        {`Over the next few years I'll be starting various web 3 projects.`}<br />
                        I want to start these projects under a pseudonym with no traces back to my real identity.<br />
                        {`So, to remain anonymous, I'm asking you to help bootstrap my wallet in exchange for some pre-ICO tokens of my first project.`}<br /> 
                        {`I'm collecting ${FOR_SOL} SOL in exchange for ${PERCENT_GIVEAWAY * 100}% (${TOTAL_SUPPLY * PERCENT_GIVEAWAY}) of the total supply of the first project's tokens`}.<br />
                        {`For my first project, I'll be building a DeCLOB on top of Orca Whirlpools: an app which allows user to set limit orders using Orca concentrated liquidity positions with the smallest possible price range.`}<br />
                        {`Orca is winning the liquidity competition over both Open Book and Raydium while Open Book is stuggling to gain momentum and lacks a user friendly UI, leaving an opening for the product I'm building.`}<br />
                        What will set this product apart is a high quality real-time order book UX available both for desktop browsers and Solana mobile.
                    </h2>
                </hgroup>
                <section className='container' style={{backgroundColor: 'none', margin: '0 auto', maxWidth: 550}}>
                    <TwitterTweetEmbed tweetId='1623764669159833601' />
                </section>
                <article data-theme="light">
                    <form className="grid">
                        <label htmlFor='send'>
                            Send SOL:
                            <input type="number" id="send" name="send" value={send} 
                                aria-label="Send Sol" required max={MAX_SEND} min={MIN_SEND} step={0.1} style={{backgroundColor: 'white'}}
                                onChange={e => {
                                    function toNum(n: any) { const conv = Number(n); return isNaN(conv) ? 0 : conv; }
                                    const finalVal = Math.min(Math.max(toNum(e.target.value), MIN_SEND), MAX_SEND);
                                    setSend(finalVal);
                                }}
                            />
                        </label>
                        <label htmlFor='get'>
                            Receive DLMT:
                            <input value={receive} readOnly/>
                        </label>
                        {connectedAs === undefined ?
                            <button type="submit" onClick={e => { e.preventDefault(); setConnectOpen(true); }}>Connect Wallet</button>
                            :
                            <div>
                                Connected as {connectedAsDisplay}<br />
                                <a role='button' style={{marginTop: 5}} href='#' onClick={e => { e.preventDefault(); submitSend(); }} >Send</a>
                                <a role='button' onClick={e => { e.preventDefault(); setConnectedAs(undefined); setSignAndSend({signAndSend: INIT_SIGN_AND_SEND}); }} style={{marginLeft: 10}} href='#'>Disconnect</a>
                            </div>
                        }
                        <ConnectToWallet onClose={() => { setConnectOpen(false); }} open={connectOpen} 
                            onConnect={(as, signAndSend) => { setConnectedAs(as); setSignAndSend({signAndSend}); }} />
                    </form>
                    <Disclaimer />
                </article>
            </header>
        </div>
    );
}