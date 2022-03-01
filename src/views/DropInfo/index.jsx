import React, { useContext, useEffect, useState } from "react";
import DropFactoryContext from "../../context/DropFactory";
import { useParams } from "react-router-dom";
import useForm from "../../hooks/useForm.js";
const styleContainer = {
  padding: "10px 20px",
};
const styleForm = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
};

function DropInfo() {
  const { getDropById, mintDrop } = useContext(DropFactoryContext);
  const { dropId } = useParams();
  const [drop, setDrop] = useState({});
  const mintQuantity = useForm({
    type: "number",
    placeholder: "quantity of mints",
    min: 1,
    max: drop?.maxMintPerTx,
  });

  useEffect(() => {
    const dropPromise = getDropById(dropId);
    Promise.all([dropPromise]).then((e) => {
      setDrop(e[0]);
    });
  }, [getDropById, dropId]);
  const mintHandler = async (e) => {
    e.preventDefault();
    const mintAmount = mintQuantity.value;
    await mintDrop(dropId, mintAmount);
  };
  return (
    <div style={styleContainer}>
      <h1>{drop?.name}</h1>
      <p>
        {drop?.totalNft?.toString()}/{drop?.maxSupply?.toString()}
      </p>
      <form style={styleForm} onSubmit={mintHandler}>
        <input style={{ margin: "10px 0" }} {...mintQuantity} />
        <button className="cta-button connect-wallet-button">Mint</button>
      </form>
    </div>
  );
}

export default DropInfo;
