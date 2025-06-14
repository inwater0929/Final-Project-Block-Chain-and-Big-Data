"use client";

import { MintButton } from "./MintButton";
import { TokenBalance } from "./TokenBalance";

export const TokenBalancePanel = () => {
  return (
    <div className="bg-white rounded-box p-4">
      <h2 className="text-xl font-bold mb-4 text-center">代幣餘額</h2>

      <div className="space-y-4">
        {/* BTC 余额和铸造按钮 */}
        <div className="flex items-center justify-between">
          <TokenBalance tokenName="Tree coin" tokenSymbol="Tree coin" contractName="BTC" />
          <MintButton tokenName="BTC" amount="100" />
        </div>

        {/* USDC 余额和铸造按钮 */}
        <div className="flex items-center justify-between">
          <TokenBalance tokenName="美元穩定幣" tokenSymbol="USDC" contractName="USDC" />
          <MintButton tokenName="USDC" amount="100" />
        </div>
      </div>
    </div>
  );
};
