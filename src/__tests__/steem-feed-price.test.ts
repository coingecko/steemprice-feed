import SteemFeedPrice from "../steem-feed-price";

describe("steem-feed-price", () => {
  it("fail over works", () => {
    const s = new SteemFeedPrice(SteemFeedPrice.steemApiList.steemit);
    const sLen = s.availableSteemApi.length;
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
