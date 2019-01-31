import fetch from "node-fetch";

type CgSimpleResponse = { [coin: string]: { usd: number } };

export const fetchCgSimplePrice = async (coin: string) => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`
  );
  const data: CgSimpleResponse = await response.json();
  return data[coin].usd;
};
