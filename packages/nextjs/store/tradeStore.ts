import { atom } from "jotai";

export type OrderType = {
  orderId: number;
  owner: string | undefined;
  price: bigint | undefined;
  amount: bigint | undefined;
  isBid: boolean | undefined;
};

export type TradeHistoryType = {
  orderId1: number;
  orderId2: number;
  price: bigint | undefined;
  amount: bigint | undefined;
  timestamp: number;
  id: string;
};

// 买单和卖单原子
export const bidOrdersAtom = atom<OrderType[]>([]);
export const askOrdersAtom = atom<OrderType[]>([]);

// 交易历史原子
export const tradeHistoryAtom = atom<TradeHistoryType[]>([]);

// 当前选择价格原子
export const selectedPriceAtom = atom<string>("");

// 当前选择的买/卖类型
export const tradeTypeAtom = atom<"buy" | "sell">("buy");

// Token授权状态
export const token0AllowanceAtom = atom<bigint>(BigInt(0));
export const token1AllowanceAtom = atom<bigint>(BigInt(0));

// Token余额
export const token0BalanceAtom = atom<bigint>(BigInt(0));
export const token1BalanceAtom = atom<bigint>(BigInt(0));
