import React, { useEffect, useState } from "react";
import DropFactoryContract from "./Contracts/NftDrop.json";
import "./App.css";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = () => {
    const { ethereum } = window;
    if (!ethereum) return alert("install metamask");
    connectWalletHandler();
  };

  const connectWalletHandler = async() => {
    try {
      const { ethereum } = window;
      if (!ethereum) return alert("make sure hace metamask installed");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (!accounts.length) return alert("autorized account nor found");
      setCurrentAccount(accounts[0]);
    } catch (error) {
      return alert(error.message);
    }
  };

  const mintNftHandler = () => {};

  const connectWalletButton = () => {
    return (
      <button
        onClick={connectWalletHandler}
        className="cta-button connect-wallet-button"
      >
        Connect Wallet
      </button>
    );
  };

  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className="cta-button mint-nft-button">
        Mint NFT
      </button>
    );
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <div className="main-app">
      <h1>Scrappy Squirrels Tutorial</h1>
      {currentAccount ? mintNftButton() : connectWalletButton()}
    </div>
  );
}

export default App;
