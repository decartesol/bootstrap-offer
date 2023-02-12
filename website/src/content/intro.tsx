import * as React from 'react';
import { AddyLink } from './addy-link';
import { ADDRESS_PUBKEY, TWITER_HANDLE, TWITTER_URL } from '@/utils/constants';
import { useSolReceived } from '@/hooks/useSolReceived';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { FOR_SOL, PERCENT_GIVEAWAY, TOTAL_SUPPLY } from './calculator';

const COMMON_TOKENOMICS = [
    `21 million max supply`,
    `Deflationary. Every dapp tx causes small amount of supply to be bought & burnt so token captures revenue over time. In the stock market, companies are valued based on current or future projected cash flow which in theory is/will be returned to shareholders as dividends or stock buybacks. Tokens should do the same, otherwise I find it difficult to justify why a token should have any value.`,
    `21% goes to founder (me) locked for several years (might be standard 4 year vest w/ 1 year cliff that begins after ICO to be held at future date). 29% is reserved for employee incentives and private raises. 50% goes to public through offers like this or through smart contract ICO-like offerings.`
];

const EXAMPLE_SEND = 4;

export const Intro: React.FC = () => {
    const {received, senders} = useSolReceived();
    return (
        <>
            <div className="container">
                <h3>Terms of Deal</h3>
                <p>
                    {`The first ${FOR_SOL} SOL sent to my address`} <AddyLink address={ADDRESS_PUBKEY} /> {`will get 
                    ${PERCENT_GIVEAWAY * 100}% of the first project's supply (so for example if you send ${EXAMPLE_SEND} SOL you will get back ${(TOTAL_SUPPLY * PERCENT_GIVEAWAY) * (EXAMPLE_SEND / FOR_SOL)} tokens).
                    Deal will no longer apply after ${FOR_SOL} SOL has been received.
                    There will be future raises but probably at a much higher market cap once the project is actually live.`}
                </p>
                <p>
                    <b>DO NOT send me very much SOL!</b> {`I would much prefer many people get involved in this project so I can ask you all questions on twitter to help guide product development. 
                    Let us maximize the community size (to speed up development and organic marketing) while minimizing any one individual's exposure in case the project fails for some reason.`}
                </p>
            </div>
            <div className="container">
                <h3>Projects</h3>
                <p>
                    {`Bootstrappers will receive tokens for the first project, which will be a limit order book dex aggregator. Mainly it will allow users to place limit orders on Orca Whirlpools but I might include Raydium concentrated liquidity too.
                    I do plan on having some kind of Web 3 Labs group which has a token that extracts value from all the Labs' child projects,
                    but the details on this aren't clear to me yet. Bootstrapers will be given a way to gain ownership in this meta project as well as the initial project.
                    Here are my planned projects (in no particular order):`}
                </p>
                <ul>
                    <li>On-chain limit order book aggregating concetrated liquidity dexes: delimit.sol</li>
                    <li>Solana-based gitopia competitor: degit.sol</li>
                    <li>Web 3 persistent world mmorts game: imagine age of empires + factorio + evony</li>
                    <li>On-chain ETFs and NFT funds (web 3 REITs), controlled by DAO and/or algorithmically (BlackRock, Vanguard competitor)</li>
                </ul>
            </div>
            <div className='container'>
                <h3>Project Tokenomics</h3>
                <p>
                    {`All the projects will have the same tokenomics:`}
                </p>
                <ul>{COMMON_TOKENOMICS.map((v, i) => <li key={i}>{v}</li>)}</ul>
                <p>
                    {`These tokenomics are not finalized. I'm sharing it here moreso to give bootstrappers and idea of my general approach to fundraising, value capture, and allocation.`}
                </p>
            </div>
            <div className="container">
                <h3>
                    Bootstrap Progress: {received === -1 ? 'loading...' : `${received} SOL recieved (${(Math.round(10000 * received / FOR_SOL) / 100)}% of ${FOR_SOL})`}
                </h3>
                <p>
                    Bootstrapers Leaderboard:
                </p>
                <ul>
                    {Object.entries(senders).map(([sender, amount]) => <li key={sender}>
                        <>{Math.round(100 * amount.toNumber() / LAMPORTS_PER_SOL) / 100} SOL from <AddyLink address={new PublicKey(sender)} showDomain={true} /></>
                    </li>)}
                </ul>
            </div>
            <div className="container">
                <h3>Got Questions/Feedback?</h3>
                <p>
                    {`Follow my twitter for updates, questions, comments, and suggestions:`} <a href={TWITTER_URL}>@{TWITER_HANDLE}</a>
                </p>
            </div>
        </>
    )
}