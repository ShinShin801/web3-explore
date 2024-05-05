import React, { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  actionType: "mint" | "burn" | "transfer";
  onClose: () => void;
  onSubmit: (amount: string, address?: string) => void;
}

const TokenModal: React.FC<ModalProps> = ({
  isOpen,
  actionType,
  onClose,
  onSubmit,
}) => {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setAmount("");
      if (actionType === "transfer") {
        setAddress("");
      }
    }
  }, [isOpen, actionType]);

  const handleSubmit = () => {
    if (actionType === "transfer") {
      onSubmit(amount, address);
    } else {
      onSubmit(amount);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">
          {actionType === "mint"
            ? "Mint Tokens"
            : actionType === "burn"
            ? "Burn Tokens"
            : "Send Tokens"}
        </h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="input input-bordered w-full mb-4"
        />
        {actionType === "transfer" && (
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Recipient Address"
            className="input input-bordered w-full mb-4"
          />
        )}
        <div className="flex justify-between space-x-4">
          <button onClick={handleSubmit} className="btn btn-primary flex-1">
            {actionType}
          </button>
          <button onClick={onClose} className="btn btn-secondary flex-1">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenModal;
