import React from "react";
import { useRouter } from "next/navigation";
import { Token } from "@/app/utils/definitions";

interface TokenCardProps {
  token: Token;
}

const TokenCard: React.FC<TokenCardProps> = ({ token }) => {
  const router = useRouter(); // Next.js Router を使用

  // カードクリック時のイベントハンドラ
  const handleClick = () => {
    // 例: トークン詳細ページにナビゲートする
    router.push(`erc20/${token.address}/action`);
  };

  return (
    <div
      className="max-w-full inline-block rounded overflow-hidden shadow-lg m-2 p-4 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
      onClick={handleClick}
    >
      <div className="font-bold text-xl mb-2">{token.name}</div>
      <p className="text-gray-700 text-base">Symbol: {token.symbol}</p>
      <p className="text-gray-700 text-base">
        Contract Address: {token.address}
      </p>
      <p className="text-gray-700 text-base">
        Total Supply: {token.totalSupply}
      </p>
      <p className="text-gray-700 text-base">
        Owned by You: {token.uhold} (
        {((token.uhold / token.totalSupply) * 100).toFixed(2)}%)
      </p>
    </div>
  );
};

export default TokenCard;
