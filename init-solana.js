const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const web3 = require('@solana/web3.js');
const os = require("os");

const config = {
    json_rpc_url: `https://rpc.helius.xyz/?api-key=${process.env.DEV_HELIUS_API_KEY}`,
    websocket_url: '',
    keypair_path: path.resolve(__dirname, 'secrets/solana.json'),
    address_labels: {
        "11111111111111111111111111111111": "System Program"
    },
    commitment: 'confirmed'
};

const configDir = path.resolve(os.homedir(), '.config/solana/cli');
if (!fs.existsSync(configDir)){
    fs.mkdirSync(configDir, { recursive: true });
}
fs.writeFileSync(path.resolve(configDir, 'config.yml'), yaml.stringify(config));

const key = process.env.DEV_WALLET_KEY;
const bs58 = require('bs58');
const decoded = Array.from(bs58.decode(key).values());

fs.writeFileSync(path.resolve(__dirname, 'secrets/solana.json'), JSON.stringify(decoded));