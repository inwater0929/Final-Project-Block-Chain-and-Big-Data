"use client";

import { useState } from "react";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

type MintButtonProps = {
  tokenName: "BTC" | "USDC";
  amount: string;
  className?: string;
};

/**
 * 铸造测试代币的按钮
 */
export const MintButton = ({ tokenName, amount, className = "" }: MintButtonProps) => {
  const { address: connectedAddress } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 获取代币合约写入函数
  const { writeContractAsync: mintToken } = useScaffoldWriteContract({
    contractName: tokenName,
  });

  const handleMint = async () => {
    if (!connectedAddress) return;

    try {
      setIsSubmitting(true);

      // 铸造代币
      await mintToken({
        functionName: "mint",
        args: [connectedAddress, parseEther(amount)],
      });
    } catch (error) {
      console.error("Mint error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      className={`btn btn-sm btn-primary ${className}`}
      onClick={handleMint}
      disabled={!connectedAddress || isSubmitting}
    >
      {isSubmitting ? <span className="loading loading-spinner loading-xs"></span> : `Mint ${amount}`}
    </button>
  );
};
