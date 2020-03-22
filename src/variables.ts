export enum HiveAPI {
  hive = "https://api.hive.blog",
  anyx = "https://anyx.io"
}

export const HiveAPIArray = Object.keys(HiveAPI).map((d: any) => HiveAPI[d]);

export const WITNESS = process.env.WITNESS!;
export const ACTIVEKEY = process.env.ACTIVEKEY!;
export const PEGMULTI = parseInt(process.env.PEGMULTI!) || 1;
export const WEBSOCKETTIMEOUT = parseInt(process.env.WEBSOCKETTIMEOUT!) || 10;
export const PRICETIMEOUT = parseInt(process.env.PRICETIMEOUT!) || 5;
export const SENSITIVITY =
  parseFloat(parseFloat(process.env.SENSITIVITY!).toFixed(3)) || 0.001;
