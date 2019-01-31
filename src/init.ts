import * as dotenv from "dotenv";
dotenv.config();

import SteemFeedPrice from "./steem-feed-price";
import L from "./logger";
import { WITNESS } from "./variables";

const sfp = new SteemFeedPrice(SteemFeedPrice.steemApiList.steemit);
sfp.start();

setInterval(() => {
  L.log("10 minutes crone job check the last price update");
  const timeNow = Date.now();
  const timeDiff = timeNow - sfp.lastPriceUpdate!;
  if (timeDiff > 5 * 60 * 1000) {
    // if timeDiff more than 5 mins, use rest api to update
    L.error("Websocket might not be working");
    sfp.updatePriceRest();
    sfp.initWebsocket();
  }
}, 10 * 60 * 1000);
