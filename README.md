# Steem-Price-Feed

[![Build Status](https://travis-ci.org/coingecko/steemprice-feed.svg?branch=master)](https://travis-ci.org/coingecko/steemprice-feed)

Update Steem Price Feed for Witness using CoinGecko API and WebSocket.

## Feature

- Using CoinGecko websocket to update Steem price feed on the fly.
- In case websocket disconnected use CoinGecko REST API `/simple/price` endpoint to update price and restart websocket.
- Using Docker or PM2 approach to respawn the script on error.

## Prerequisite

- Node.js (v8+)
- Makefile installed (optional)
- Docker (optional)

## Setup

**General step**

- git clone this repo `git clone git@github.com:coingecko/steemprice-feed.git`
- `cd steemprice-feed`
- edit .env.sample to .env (`cp .env.sample .env` then `nano .env` or `vi .env`)

```
ACTIVEKEY= # Steem Active Key (String)
WITNESS= # Steem Witness Username (String)
PEGMULTI=1 # Peg Multiple settings (Number) [default: 1]
WEBSOCKETTIMEOUT=10 # Time out in minutes for checking web socket (Number) [default: 10]
PRICETIMEOUT=5 # Time out in minutes for last price check (Number) [default: 5]
```

### Docker

- Make sure docker is installed. [Installation guide](https://docs.docker.com/install/)

```sh
docker-compose build # Build the docker image
docker-compose up -d # Run the docker
docker-compose logs # to see log message
docker-compose logs --tail="all" # To see all logs
docker-compose down # To shut down docker
```

### Without Docker

- Make sure Makefile are installed. Read `Makefile` for the full command being used.
- run `make init` to install pm2 (skip this step if you already install pm2, and run `npm install`)
- run `make start` (start the tool with pm2)

There is other command available as well:

- To stop the price feed update, run `make stop`
- To delete existing process running run `make delete`
- To check log message, run `make log`
- To check log message (last 1000), run `make log-1000`

## RoadMap

- Fallback to Exchange data source.
- Handle error properly.

## License

MIT
