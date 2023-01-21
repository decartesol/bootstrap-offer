import * as React from 'react';

const TOTAL_SUPPLY = 21_000_000;
const PERCENT_GIVEAWAY = 0.05;
const FOR_SOL = 400;
const MIN_GIVE = 0;

function calcTokens(sol: number) {
    const gave = Math.max(Math.min(sol, FOR_SOL), MIN_GIVE);
    const tokensToGive = TOTAL_SUPPLY * PERCENT_GIVEAWAY;
    const percentContributed = gave / FOR_SOL;
    return percentContributed * tokensToGive;
}

export const Calculator: React.FC = () => {
    const [amount, setAmount] = React.useState(1);
    const tokens = calcTokens(amount);
    return (
        <div>
            If you send <input type="number" value={amount} onChange={e => { setAmount(e.target.valueAsNumber) }} min={MIN_GIVE} max={FOR_SOL} /> 
            SOL you will receive {tokens} of the first project token
        </div>
    )
}