import * as dotenv from "dotenv";
dotenv.config();

import SteemFeedPrice from "./steem-feed-price";
import L from "./logger";
import {
  WEBSOCKETTIMEOUT,
  PRICETIMEOUT,
  WITNESS,
  ACTIVEKEY
} from "./variables";

if (!WITNESS || !ACTIVEKEY) {
  L.error("ENV not setup");
  process.exit(1);
}

const sfp = new SteemFeedPrice(SteemFeedPrice.steemApiList.steemit);
sfp.start();

setInterval(() => {
  L.log("10 minutes crone job check the last price update");
  const timeNow = Date.now();
  const timeDiff = timeNow - sfp.lastPriceUpdate!;
  if (timeDiff > PRICETIMEOUT * 60 * 1000) {
    // if timeDiff more than TIMEOUT mins, use rest api to update
    L.error("Websocket might not be working");
    sfp.updatePriceRest();
    sfp.initWebsocket();
  }
}, WEBSOCKETTIMEOUT * 60 * 1000);
