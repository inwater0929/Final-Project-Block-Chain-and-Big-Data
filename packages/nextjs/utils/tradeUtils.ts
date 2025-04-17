// 格式化价格为更易读的格式
export const formatPrice = (price: bigint | undefined): string => {
  try {
    if (!price) return "0.00";
    return (Number(price) / 1e18).toFixed(6);
  } catch {
    return "0.00";
  }
};

// 格式化数量
export const formatAmount = (amount: bigint | undefined): string => {
  try {
    if (!amount) return "0.00";
    return (Number(amount) / 1e18).toFixed(6);
  } catch {
    return "0.00";
  }
};

// 截断地址
export const truncateAddress = (address: string | undefined): string => {
  if (!address) return "未知";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// 计算订单总价值 (price * amount)
export const calculateOrderValue = (price: bigint | undefined, amount: bigint | undefined): string => {
  try {
    if (!price || !amount) return "0.00";
    const value = (Number(price) * Number(amount)) / 1e36;
    return value.toFixed(6);
  } catch {
    return "0.00";
  }
};

// 安全序列化包含 BigInt 的对象
export const safeJsonStringify = (obj: any): string => {
  return JSON.stringify(obj, (_, value) => (typeof value === "bigint" ? value.toString() : value));
};

// 安全比较两个对象是否相等（支持BigInt）
export const areObjectsEqual = <T extends object>(obj1: T, obj2: T): boolean => {
  return safeJsonStringify(obj1) === safeJsonStringify(obj2);
};
