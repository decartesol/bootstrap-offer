#!/bin/bash
sudo apt-get update
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
sudo apt-get -y install libudev-dev
cargo install spl-token-cli
sudo apt-get -y install tmux
npm i -g pnpm
pnpm i
pnpm --filter "website" dev