# Steem-Price-Feed

[![Build Status](https://travis-ci.org/coingecko/steemprice-feed.svg?branch=master)](https://travis-ci.org/coingecko/steemprice-feed)

Update Steem Price Feed for Witness using CoinGecko API and WebSocket.

## Feature

- Using CoinGecko websocket to update Steem price feed on the fly.
- In case websocket disconnected use CoinGecko REST API `/simple/price` endpoint to update price and restart websocket.

## Prerequisite

- Node.js (v8+)
- Makefile installed

## Setup

Read `Makefile` for the full command being used.

- git clone this repo `git clone git@github.com:coingecko/steemprice-feed.git`
- edit .env.sample to .env

```
ACTIVE_KEY= # Steem Active Key (String)
WITNESS= # Steem Witness Username (String)
PEGMULTI=1 # Peg Multiple settings (Number) [default: 1]
WEBSOCKETTIMEOUT=10 # Time out for checking web socket (Number) [default: 10]
PRICETIMEOUT=5 # Time out for last price check (Number) [default: 5]
```

- run `make init` to install pm2, skip this step if you already install pm2
- run `make start` (start the tool with pm2)

## RoadMap

- Fallback to Exchange data source.

## License

MIT
