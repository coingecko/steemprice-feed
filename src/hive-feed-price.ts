import { Client, Price, Asset, FeedPublishOperation, PrivateKey } from "dsteem";
import {
  HiveAPI,
  HiveAPIArray,
  ACTIVEKEY,
  WITNESS,
  PEGMULTI,
  SENSITIVITY
} from "./variables";
import { coinDataListener } from "./websocket";
import { fetchCgSimplePrice } from "./restapi";
import L from "./logger";

export default class HiveFeedPrice {
  // data
  public client: Client;
  public coinDataListener: { unsubscribe: () => void } | null = null;
  public retries = 0;
  public currentApiPosition = 0;
  public availableHiveApi = HiveAPIArray;
  public hivePrice = 0;
  public lastPriceUpdate: number = 0;

  // Static data
  public static hiveApiList = HiveAPI;

  constructor(api: HiveAPI) {
    L.log("Initialize price feed");
    this.currentApiPosition =
      this.availableHiveApi.indexOf(api) > -1
        ? this.availableHiveApi.indexOf(api)
        : 0;
    const currentApi = this.availableHiveApi[this.currentApiPosition];
    L.log(`Current API: ${currentApi}`);
    this.client = new Client(currentApi);
  }

  // Start FeedPrice
  public async start() {
    this.initWebsocket();
    this.updatePriceRest();
  }

  public initWebsocket() {
    if (this.coinDataListener) {
      L.log("resubsribe to websocket");
      this.coinDataListener.unsubscribe();
    }
    this.coinDataListener = coinDataListener(["hive"], data => {
      const currentPrice = data.data.p.usd;
      L.log(`[ws 🦎 ] Current Hive Price ${currentPrice}`);
      const prevPrice = this.hivePrice;
      if (Math.abs(prevPrice - currentPrice) > SENSITIVITY) {
        this.hivePrice = parseFloat(parseFloat(`${currentPrice}`).toFixed(3));
        this.publishFeed(currentPrice, 3);
      } else {
        L.log("[ws 🦎 ] Price not change");
      }
    });
  }

  public async updatePriceRest() {
    const currentPrice = await this.getHivePrice();
    L.log(`[api 🦎 ] Current Hive Price ${currentPrice}`);
    const prevPrice = this.hivePrice;
    const diffPrice =
      Number(prevPrice.toFixed(3)) - Number(currentPrice.toFixed(3));
    if (Math.abs(diffPrice) > SENSITIVITY) {
      this.hivePrice = parseFloat(parseFloat(`${currentPrice}`).toFixed(3));
      this.publishFeed(currentPrice, 3);
    } else {
      L.log("[api 🦎 ] Price not change");
    }
  }

  public async getHivePrice() {
    return await fetchCgSimplePrice("hive");
  }

  // util
  public async publishFeed(price: number, retries = 0) {
    try {
      const exchange_rate = new Price(
        Asset.fromString(`${price.toFixed(3)} SBD`),
        Asset.fromString(`${(1 / PEGMULTI).toFixed(3)} STEEM`)
      );
      const op: FeedPublishOperation = [
        "feed_publish",
        { exchange_rate, publisher: WITNESS }
      ];
      await this.client.broadcast.sendOperations(
        [op],
        PrivateKey.from(ACTIVEKEY)
      );
      L.success(`Successful update price to $${price.toFixed(3)} (${price})`);
      this.lastPriceUpdate = Date.now();
      this.retries = 0;
    } catch (error) {
      L.error(error);
      if (retries < this.retries) {
        await this.timeout(1000);
        await this.publishFeed(price, (retries += 1));
      } else {
        this.rpcFailover();
        await this.publishFeed(price, 0);
      }
    }
  }

  public rpcFailover() {
    this.currentApiPosition =
      this.currentApiPosition + 1 > this.availableHiveApi.length
        ? 0
        : this.currentApiPosition + 1;
    const currentApi = this.availableHiveApi[this.currentApiPosition];
    L.error(`Failover, switch to ${currentApi}`);
    this.client = new Client(currentApi);
  }

  public timeout(time: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), time);
    });
  }
}
