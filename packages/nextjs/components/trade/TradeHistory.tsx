"use client";

import { useTradeHistory } from "~~/hooks/trade/useTradeHistory";
import { formatAmount, formatPrice } from "~~/utils/tradeUtils";

export const TradeHistory = () => {
  const { orderMatchedEvents } = useTradeHistory();

  // 格式化时间 - 由于没有实际时间戳，这里使用区块号
  const formatBlockNumber = (blockNumber: number) => {
    return `區塊 #${blockNumber}`;
  };

  return (
    <div className="overflow-y-auto max-h-[600px]">
      <table className="table table-xs w-full">
        <thead>
          <tr>
            <th>區塊</th>
            <th>價格</th>
            <th>數量</th>
          </tr>
        </thead>
        <tbody>
          {orderMatchedEvents.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4">
                暫無成交紀錄
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
