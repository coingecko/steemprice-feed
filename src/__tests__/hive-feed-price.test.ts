import HiveFeedPrice from "../hive-feed-price";

describe("steem-feed-price", () => {
  it("fail over works", () => {
    const s = new HiveFeedPrice(HiveFeedPrice.hiveApiList.hive);
    const sLen = s.availableHiveApi.length;
    Array(sLen)
      .fill(undefined)
      .forEach((_, key) => {
        expect(s.currentApiPosition).toEqual(key);
        s.rpcFailover();
      });
    s.rpcFailover();
    expect(s.currentApiPosition).toEqual(0);
  });
});
