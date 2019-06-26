import * as ws from "ws";
import L from "./logger";

export interface ICoinMessage {
  identifier: { channel: string; m: string };
  data: {
    c: string;
    e: { [currency: string]: number };
    p: { [currency: string]: number };
  };
}

export const coinDataListener = (
  coinIds: string[],
  callback: (cbdata: ICoinMessage) => void
) => {
  const subscribers: ws[] = [];
  coinIds.forEach(coinId => {
    const socket = new ws("wss://cable.coingecko.com/cable");
    const msg = {
      command: "subscribe",
      identifier: JSON.stringify({
        channel: "AChannel",
        m: coinId
      })
    };
    socket.onopen = () => socket.send(JSON.stringify(msg));
    socket.onmessage = (data: any) => {
      const res = JSON.parse(data.data);
      if (res.identifier && !res.type) {
        callback({
          identifier: JSON.parse(res.identifier) as any,
          data: res.message as any
        });
      }
    };
    socket.onerror = () => {
      L.error("Websocket error");
    };
    subscribers.push(socket);
  });

  return {
    unsubscribe() {
      // unsub all subscriber
      subscribers.forEach(s => {
        s.close();
      });
    }
  };
};
