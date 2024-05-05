// import React, {
//   createContext,
//   useContext,
//   useState,
//   Dispatch,
//   SetStateAction,
//   ReactNode,
// } from "react";

// interface WalletContextType {
//   currentAddress: string | null;
//   setCurrentAddress: Dispatch<SetStateAction<string | null>>;
// }

// const WalletContext = createContext<WalletContextType | undefined>(undefined);

// export const useWallet = () => {
//   const context = useContext(WalletContext);
//   if (!context) throw new Error("WalletContext not found");
//   return context;
// };

// export const WalletProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [currentAddress, setCurrentAddress] = useState<string | null>(null);

//   return (
//     <WalletContext.Provider value={{ currentAddress, setCurrentAddress }}>
//       {children}
//     </WalletContext.Provider>
//   );
// };
