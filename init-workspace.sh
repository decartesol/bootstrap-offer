#!/bin/bash
sudo apt-get update
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
sudo apt-get -y install libudev-dev
# Get the latest version https://github.com/solana-labs/solana/releases
sh -c "$(curl -sSfL https://release.solana.com/v1.13.6/install)"
cargo install spl-token-cli
sudo apt-get -y install tmux
npm i -g pnpm
pnpm i
node init-solana.js
pnpm --filter "website" dev
# run the following until we get a hit
# solana-keygen grind --starts-with DeLimit:1 88 is length of key