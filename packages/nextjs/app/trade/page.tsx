"use client";

import { Suspense } from "react";
import { OrderBook } from "~~/components/trade/OrderBook";
import { TokenBalancePanel } from "~~/components/trade/TokenBalancePanel";
import { TradeForm } from "~~/components/trade/TradeForm";
import { TradeHistory } from "~~/components/trade/TradeHistory";

export default function TradePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-center text-4xl font-bold mb-8">交易中心</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* 左侧订单簿 */}
        <div className="w-full md:w-1/3 bg-white rounded-box p-4">
          <h2 className="text-xl font-bold mb-4 text-center">订单簿</h2>
          <Suspense fallback={<div className="animate-pulse">加载订单簿...</div>}>
            <OrderBook />
          </Suspense>
        </div>

        {/* 中间成交记录 */}
        <div className="w-full md:w-1/3 bg-white rounded-box p-4">
          <h2 className="text-xl font-bold mb-4 text-center">成交记录</h2>
          <Suspense fallback={<div className="animate-pulse">加载成交记录...</div>}>
            <TradeHistory />
          </Suspense>
        </div>

        {/* 右侧面板 */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* 代币余额面板 */}
          <Suspense fallback={<div className="animate-pulse">加载代币余额...</div>}>
            <TokenBalancePanel />
          </Suspense>

          {/* 交易表单 */}
          <div className="bg-white rounded-box p-4">
            <h2 className="text-xl font-bold mb-4 text-center">下单</h2>
            <Suspense fallback={<div className="animate-pulse">加载表单...</div>}>
              <TradeForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
