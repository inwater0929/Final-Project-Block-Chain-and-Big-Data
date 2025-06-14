"use client";

import { ReactNode, useEffect, useState } from "react";
import { maxUint256, parseEther } from "viem";
import { useAccount } from "wagmi";
import { useDeployedContractInfo, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

// 定义支持的合约名称
type SupportedToken = "BTC" | "USDC";

export interface ApproveButtonProps {
  tokenName: SupportedToken;
  amount: string;
  children: ReactNode;
  className?: string;
  approveText?: string;
}

export const ApproveButton = ({
  tokenName,
  amount,
  children,
  className = "",
  approveText = "授權",
}: ApproveButtonProps) => {
  const { address: connectedAddress } = useAccount();
  const [hasAllowance, setHasAllowance] = useState(false);

  // 获取CLOB合约信息
  const { data: clobContract } = useDeployedContractInfo({
    contractName: "CLOB",
  });

  // 读取当前授权额度
  const { data: allowance } = useScaffoldReadContract({
    contractName: tokenName,
    functionName: "allowance",
    args: [connectedAddress || undefined, clobContract?.address || undefined],
    watch: false,
  });

  // 使用Scaffold-eth的合约写入钩子
  const { writeContractAsync, isPending } = useScaffoldWriteContract({
    contractName: tokenName,
  });

  // 检查是否有足够的授权额度
  useEffect(() => {
    if (allowance && amount && connectedAddress && clobContract) {
      try {
        const amountBigInt = parseEther(amount);
        setHasAllowance(BigInt(allowance.toString()) >= amountBigInt);
      } catch (error) {
        console.error("解析金額錯誤:", error);
        setHasAllowance(false);
      }
    } else {
      setHasAllowance(false);
    }
  }, [allowance, amount, connectedAddress, clobContract]);

  // 处理授权操作
  const handleApprove = async () => {
    if (!clobContract || !amount || parseFloat(amount) <= 0) return;

    try {
      // 调用approve函数
      await writeContractAsync(
        {
          functionName: "approve",
          args: [clobContract.address, maxUint256],
        },
        {
          onBlockConfirmation: txnReceipt => {
            console.log("📦 交易區塊哈希", txnReceipt.blockHash);
            notification.success("授權已確認");
            setHasAllowance(true);
          },
        },
      );

      notification.success("授權請求已發送");
    } catch (error) {
      console.error("授權失敗:", error);
      notification.error("授權失敗");
    }
  };

  // 如果金额为空，显示灰色图标和"请输入"文本
  if (!amount || amount === "") {
    return (
      <button className={`${className} opacity-50 cursor-not-allowed`} disabled={true}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 inline-block mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        請輸入
      </button>
    );
  }

  // 如果已有足够授权，直接显示children
  if (hasAllowance) {
    return <>{children}</>;
  }

  // 否则显示授权按钮
  return (
    <button className={className} onClick={handleApprove} disabled={!clobContract || isPending}>
      {isPending ? "授權中..." : approveText}
    </button>
  );
};
