import * as React from 'react';
import Image from 'next/image';
import { BASE_PATH, ADDRESS_PUBKEY } from '@/utils/constants';
import { PublicKey } from '@solana/web3.js';

const ANIMATION_DURATION = 1000;
const SIDE_PADDING = 30;

export const ConnectToWallet: React.FC<{onClose: () => void, open: boolean, onConnect: (conncectAs: PublicKey) => void}> = ({onClose, open, onConnect}) => {
    const [computedOpen, setComputedOpen] = React.useState(open);
    const [phantomError, setPhantomError] = React.useState("");

    const PHANTOM = (typeof window !== 'undefined') ? (window as any).phantom : undefined;
    const IS_PHANTOM_PRESENT = PHANTOM !== undefined;

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
    async function connectPhantom() {
        if (!IS_PHANTOM_PRESENT) return;
        console.log(`phantom`, PHANTOM);
        // TODO: handle rejection
        const pk = (await PHANTOM.solana.connect()).publicKey as PublicKey;
        onConnect(pk);
        onClose();
    }
    return (
        <dialog id="modal-example" open={computedOpen}>
            <article style={{padding: `40px ${SIDE_PADDING}px 20px ${SIDE_PADDING}px`, width: 350}}>
                <section className="container" style={{marginBottom: 0, width: '100%'}}>
                    <button className="contrast" onClick={e => { e.preventDefault(); }} style={{position: 'relative'}}>
                        <ButtonLogo path={`${BASE_PATH}/solflare.png`} name='Solflare' />
                        Solflare
                    </button>
                    <button className={IS_PHANTOM_PRESENT ? 'contrast' : 'secondary'} onClick={e => { e.preventDefault(); connectPhantom(); }} style={{position: 'relative'}}>
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