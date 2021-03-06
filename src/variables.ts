export enum SteemAPI {
  steemit = "https://api.steemit.com",
  buildteam = "https://rpc.buildteam.io",
  minnowsupport = "https://steemd.minnowsupportproject.org",
  privex = "https://steemd.privex.io",
  gtg = "https://gtg.steem.house:8090"
}

export const SteemApiArray = Object.keys(SteemAPI).map((d: any) => SteemAPI[d]);

export const WITNESS = process.env.WITNESS!;
export const ACTIVEKEY = process.env.ACTIVEKEY!;
export const PEGMULTI = parseInt(process.env.PEGMULTI!) || 1;
export const WEBSOCKETTIMEOUT = parseInt(process.env.WEBSOCKETTIMEOUT!) || 10;
export const PRICETIMEOUT = parseInt(process.env.PRICETIMEOUT!) || 5;
export const SENSITIVITY =
  parseFloat(parseFloat(process.env.SENSITIVITY!).toFixed(3)) || 0.001;
