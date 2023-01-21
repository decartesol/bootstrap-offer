import * as React from 'react';

export const Intro: React.FC<{address: string}> = ({address}) => {
    return (
        <div>
            <p>
                Over the next few years I'll be starting some web 3 projects. I want to start these under a pseudonym w/ no traces to my real identity,
                so I'm asking you to help bootstrap my wallet.
            </p>
            <p>
                All the projects will have the same tokenomics:
                <ul>
                    <li>
                        21 million max supply
                    </li>
                    <li>
                        deflationary. every dapp tx causes small amount of supply to be bought & burnt so token captures revenue over time
                    </li>
                    <li>
                        21% goes to founder (me) locked for several years (might be standard 4 year vest w/ 1 year cliff that begins after ICO to be held at future date). 29% is reserved for employee incentives and private raises. 50% goes to public through offers like this or through smart contract ICO-like offerings.
                    </li>
                </ul>
            </p>
            <p>
                First project is a dex aggregator. Can't say more than that until I have something working on mainnet.
            </p>
            <p>
                The first 400 SOL sent to my address <a href={`https://explorer.solana.com/address/${address}`}>{address}</a> will get 
                5% of the first project's supply (so for example if you send 4 SOL you'll get back 10500 tokens).
                Deal will no longer apply after 400 SOL has been received.
                There'll be future raises but probably at a much higher mcap once the project is actually live.
            </p>
            <p>
                I'll post a twitter account for you all to follow once I can buy relevant .sol domains.
            </p>
            <p>
                Don't send me much. I'd prefer multiple people get invested in this so I can ask you all questions on twitter to help guide product development. 
                I also don't want a ton of death threats from overly invested folks in the event a project fails / is cancelled.
            </p>
        </div>
    )
}