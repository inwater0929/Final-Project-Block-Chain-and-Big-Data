"use client";

import { useTradeHistory } from "~~/hooks/trade/useTradeHistory";
import { formatAmount, formatPrice } from "~~/utils/tradeUtils";

export const TradeHistory = () => {
  const { orderMatchedEvents } = useTradeHistory();

  // 格式化时间 - 由于没有实际时间戳，这里使用区块号
  const formatBlockNumber = (blockNumber: number) => {
    return `区块 #${blockNumber}`;
  };

  return (
    <div className="overflow-y-auto max-h-[600px]">
      <table className="table table-xs w-full">
        <thead>
          <tr>
            <th>区块</th>
            <th>价格</th>
            <th>数量</th>
          </tr>
        </thead>
        <tbody>
          {orderMatchedEvents.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4">
                暂无成交记录
              </td>
            </tr>
          ) : (
            orderMatchedEvents.map(trade => (
              <tr key={trade.id}>
                <td>{formatBlockNumber(trade.timestamp)}</td>
                <td>{formatPrice(trade.price)}</td>
                <td>{formatAmount(trade.amount)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
