import React, { useState, FormEvent } from "react";

interface MintFormProps {
  onMint: (amount: string) => void;
}

const MintForm = () => {
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // if (amount) onMint(amount);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-medium">Mint Tokens</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input input-bordered w-full max-w-xs"
        placeholder="Amount to mint"
        min="1"
      />
      <button type="submit" className="btn btn-primary">
        Mint
      </button>
    </form>
  );
};

export default MintForm;
