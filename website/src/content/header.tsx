import { ADDRESS_PUBKEY, TWITTER_URL } from '@/utils/constants';
import * as React from 'react';
import { AddyLink } from './addy-link';
import { FOR_SOL, PERCENT_GIVEAWAY, TOTAL_SUPPLY } from './calculator';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const MIN_SEND = .1;
const MAX_SEND = 5;

export const Header: React.FC = () => {
    const [send, setSend] = React.useState(1);
    const receive = Math.round((send / FOR_SOL) * (PERCENT_GIVEAWAY * TOTAL_SUPPLY) * 100) / 100;
    return (
        <div className="hero" data-theme="dark">
            <header className="container">
                <hgroup>
                    <h1>Bootstrap <AddyLink address={ADDRESS_PUBKEY} showDomain={true} /> <a className='fa fa-twitter' href={TWITTER_URL}></a></h1>
                    <h2>
                        Greetings. I am a SWE with over a decade of programming & system design experience.<br />
                        {`Over the next few years I'll be starting various web 3 projects.`}<br />
                        I want to start these projects under a pseudonym with no traces back to my real identity.<br />
                        {`So, to remain anonymous, I'm asking you to help bootstrap my wallet in exchange for some pre-ICO tokens of my first project.`}<br /> 
                        {`I'm collecting ${FOR_SOL} SOL in exchange for ${PERCENT_GIVEAWAY * 100}% (${TOTAL_SUPPLY * PERCENT_GIVEAWAY}) of the total supply of the first project's tokens`}.<br />
                        {`For my first project, I'll be building a DeCLOB on top of Orca Whirlpools.`}<br />
                        Orca is winning the liquidity competition while Open Book is hardly innovating, leaving an opening for a product such as this.<br />
                        What will set this product apart is a high class real-time order book UX available both for desktop browsers and Solana mobile.
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
                        <button type="submit" onClick={e => { e.preventDefault(); }}>Connect Wallet</button>
                    </form>
                </article>
            </header>
        </div>
    );
}