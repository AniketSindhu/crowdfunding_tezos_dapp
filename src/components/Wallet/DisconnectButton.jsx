import { TezosToolkit } from "@taquito/taquito";

function DisconnectButton({
  wallet,
  setUserAddress,
  setUserBalance,
  setWallet,
  setTezos,
  setBeaconConnection,
  userBalance,
  userAddress,
}) {
  const disconnectWallet = async () => {
    //window.localStorage.clear();
    setUserAddress("");
    setUserBalance(0);
    setWallet(null);
    const tezosTK = new TezosToolkit("https://florencenet.smartpy.io");
    setTezos(tezosTK);
    setBeaconConnection(false);
    console.log("disconnecting wallet");
    if (wallet) {
      await wallet.client.removeAllAccounts();
      await wallet.client.removeAllPeers();
      await wallet.client.destroy();
    }
  };
  return (
    <div>
      <button
        style={{
          margin: "20px 10px 10px 10px",
          backgroundColor: "#1976D2",
          color: "white",
          border: "none",
          cursor: "pointer",
          padding: "10px",
        }}
        onClick={disconnectWallet}
      >
        <div>
          <b>Disconnect Wallet</b>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ margin: "0px 5px 0px 5px" }}>
              {(userBalance / 1000000).toFixed(3)} Tez
            </div>
            |{"  "}
            <div style={{ margin: "0px 5px 0px 5px" }}>
              {userAddress.slice(0, 5)}...{userAddress.slice(-5)}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

export default DisconnectButton;
