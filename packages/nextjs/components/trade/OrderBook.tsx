"use client";

import React, { useMemo } from "react";
import { useAtom } from "jotai";
import { useScaffoldWatchContractEvent } from "~~/hooks/scaffold-eth";
import { MergedOrderType, useOrderBook } from "~~/hooks/trade/useOrderBook";
import { selectedPriceAtom, tradeTypeAtom } from "~~/store/tradeStore";
import { formatAmount, formatPrice } from "~~/utils/tradeUtils";

// 定义合并订单类型

// 事件监听组件
const OrderBookEventListener = React.memo(function OrderBookEventListener({
  onOrdersChange,
}: {
  onOrdersChange: () => void;
}) {
  useScaffoldWatchContractEvent({
    contractName: "CLOB",
    onLogs: () => onOrdersChange(),
  });

  return null;
});

const calculateMidPrice = (mergedAsks: MergedOrderType[], mergedBids: MergedOrderType[]) => {
  if (mergedAsks.length > 0 && mergedBids.length > 0 && mergedAsks[0].price && mergedBids[0].price) {
    return formatPrice((mergedAsks[0].price + mergedBids[0].price) / BigInt(2));
  }
  if (mergedAsks.length > 0 && mergedAsks[0].price) {
    return formatPrice(mergedAsks[0].price);
  }
  if (mergedBids.length > 0 && mergedBids[0].price) {
    return formatPrice(mergedBids[0].price);
  }
  return "等待市场";
};

export const OrderBook = () => {
  const [, setSelectedPrice] = useAtom(selectedPriceAtom);
  const [, setTradeType] = useAtom(tradeTypeAtom);
  const { mergedAsks, mergedBids, isLoading, refetchOrderBook: refetch } = useOrderBook();

  // 选择价格
  const handleSelectPrice = (price: bigint, isBuy: boolean) => {
    setSelectedPrice(formatPrice(price));
    setTradeType(isBuy ? "sell" : "buy");
  };

  // 计算中间价格（最佳买价和最佳卖价的平均值）
  const midPrice = useMemo(() => calculateMidPrice(mergedAsks, mergedBids), [mergedAsks, mergedBids]);

  // 加载中状态
  if (isLoading) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-2">加载订单簿...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* 事件监听器组件 */}
      <OrderBookEventListener onOrdersChange={refetch} />

      {/* 刷新按钮 */}
      <div className="mb-2 flex justify-end">
        <button className="btn btn-xs btn-outline" onClick={() => refetch()}>
          刷新
        </button>
      </div>

      {/* 卖单 (ASK) - 价格从高到低 */}
      <div className="flex-1 overflow-y-auto max-h-[300px]">
        <table className="table table-xs w-full">
          <thead>
            <tr>
              <th>价格</th>
              <th>数量</th>
              <th>订单数</th>
            </tr>
          </thead>
          <tbody>
            {mergedAsks.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  暂无卖单
                </td>
              </tr>
            ) : (
              [...mergedAsks].reverse().map((mergedOrder, index) => (
                <tr
                  key={`ask-${index}`}
                  className="hover cursor-pointer"
                  onClick={() => mergedOrder.price && handleSelectPrice(mergedOrder.price, true)}
                >
                  <td className="text-[#F6465D]">{formatPrice(mergedOrder.price)}</td>
                  <td>{formatAmount(mergedOrder.totalAmount)}</td>
                  <td>{mergedOrder.orders.length}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 最新价格 */}
      <div className="py-3 text-center font-bold text-xl border-y border-base-300 my-2">{midPrice}</div>

      {/* 买单 (BID) - 价格从高到低 */}
      <div className="flex-1 overflow-y-auto max-h-[300px]">
        <table className="table table-xs w-full">
          <thead>
            <tr>
              <th>价格</th>
              <th>数量</th>
              <th>订单数</th>
            </tr>
          </thead>
          <tbody>
            {mergedBids.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  暂无买单
                </td>
              </tr>
            ) : (
              mergedBids.map((mergedOrder, index) => (
                <tr
                  key={`bid-${index}`}
                  className="hover cursor-pointer"
                  onClick={() => mergedOrder.price && handleSelectPrice(mergedOrder.price, false)}
                >
                  <td className="text-[#2EBD85]">{formatPrice(mergedOrder.price)}</td>
                  <td>{formatAmount(mergedOrder.totalAmount)}</td>
                  <td>{mergedOrder.orders.length}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
