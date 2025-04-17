"use client";

import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type TokenBalanceProps = {
  tokenName: string;
  tokenSymbol: string;
  contractName: "BTC" | "USDC" | "CLOB";
  className?: string;
};

/**
 * 显示用户的代币余额
 */
export const TokenBalance = ({ tokenName, tokenSymbol, contractName, className = "" }: TokenBalanceProps) => {
  const { address: connectedAddress } = useAccount();

  // 读取代币余额
  const { data: balance, isLoading } = useScaffoldReadContract({
    contractName,
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  if (!connectedAddress || isLoading) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 bg-slate-300 rounded"></div>
        </div>
      </div>
    );
  }

  const formattedBalance = balance ? Number(formatEther(balance)) : 0;

  return (
    <div className={`flex items-center ${className}`}>
      <span className="font-bold mr-2">{tokenName}:</span>
      <span>
        {formattedBalance.toFixed(4)} {tokenSymbol}
      </span>
    </div>
  );
};
