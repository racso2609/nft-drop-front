import React, { createContext, useEffect, useState } from "react";
import DropFactoryContract from "../../Contracts/NftDrop.json";
import {ethers} from "ethers";

const DropFactoryContext = createContext();

export function DropFactoryProvider({children}) {
  const address = DropFactoryContract.address;
  const abi = DropFactoryContract.abi;
  const [dropFactory, setDropFactory] = useState(null);
  useEffect(() => {
    const { ethereum } = window;
    if (!ethereum) return alert("Install metamask");
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const dropFactoryContract = new ethers.Contract(address, abi, signer);
    setDropFactory(dropFactoryContract);
  }, [abi, address]);

  const createDrop = async ({
    maxSupply,
    name,
    cid,
    prefix,
    sufix,
    hiddenURI,
    maxPerTx,
  }) => {
    try {
      const tx = await dropFactory.createDrop(
        maxSupply,
        name,
        cid,
        prefix,
        sufix,
        hiddenURI,
        maxPerTx
      );
      await tx.wait();
      alert("drop create succesfully " + tx.hash);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <DropFactoryContext.Provider value={{ address, abi, dropFactory, createDrop }}>
      {children}
    </DropFactoryContext.Provider>
  );
}
export default DropFactoryContext;
