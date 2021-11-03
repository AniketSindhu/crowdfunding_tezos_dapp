import React, { useEffect } from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";
function ConnectButton({
  Tezos,
  setWallet,
  setUserAddress,
  setUserBalance,
  setBeaconConnection,
  wallet,
}) {
  const setup = async (userAddress) => {
    setUserAddress(userAddress);
    // updates balance
    const balance = await Tezos.tz.getBalance(userAddress);
    setUserBalance(balance.toNumber());
    //console.log("balance", balance.toNumber());
  };

  const connectWallet = async () => {
    try {
      console.log("connecting wallet", wallet);
      await wallet.requestPermissions({
        network: {
          type: "granadanet",
        },
      });
      // gets user's address
      //console.log("connecting wallet");
      const userAddress = await wallet.getPKH();
      //console.log("userAddress", userAddress);
      await setup(userAddress);
      setBeaconConnection(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      console.log("Called");
      // creates a wallet instance
      const options = {
        name: "Crpwdfunding Dapp",
        iconUrl: "https://tezostaquito.io/img/favicon.png",
        preferredNetwork: "granadanet",
      };
      const wallet = new BeaconWallet(options, {
        name: "Crowdfunding Dapp",
        preferredNetwork: "granadanet",
        disableDefaultEvents: true,
      });
      Tezos.setWalletProvider(wallet);
      setWallet(wallet);
      // checks if wallet was connected before
      const activeAccount = await wallet.client.getActiveAccount();
      if (activeAccount) {
        console.log(activeAccount);
        const userAddress = await wallet.getPKH();
        await setup(userAddress);
        setBeaconConnection(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <button
        style={{
          margin: "20px 10px 10px 10px",
          backgroundColor: "#1976D2",
          color: "white",
          border: "none",
          cursor: "pointer",
          padding: "10px 20px",
        }}
        onClick={connectWallet}
      >
        <b>Connect Wallet</b>
      </button>
    </div>
  );
}

export default ConnectButton;
