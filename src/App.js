import React, { useContext } from "react";
import DropFactoryContract from "./Contracts/NftDrop.json";
import WalletContext from "./context/Wallet";
import "./App.css";

const ConnectWalletButton = () => {
  const { connectWalletHandler } = useContext(WalletContext);

  return (
    <button
      onClick={connectWalletHandler}
      className="cta-button connect-wallet-button"
    >
      Connect Wallet
    </button>
  );
};

const MintNftButton = () => {
  const mintNftHandler = () => {};

  return (
    <button onClick={mintNftHandler} className="cta-button mint-nft-button">
      Mint NFT
    </button>
  );
};

function App() {
  const { currentAccount } = useContext(WalletContext);

  return (
    <div className="main-app">
      <h1>Nft Drop Factory</h1>
      {currentAccount ? <MintNftButton /> : <ConnectWalletButton />}
    </div>
  );
}

export default App;
