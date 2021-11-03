import "./App.css";
import ProjectOngoing from "./components/ProjectOngoing";
import { useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import DisconnectButton from "./components/Wallet/DisconnectButton";
import ConnectButton from "./components/Wallet/ConnectButton";

function App() {
  const [Tezos, setTezos] = useState(
    new TezosToolkit("https://granadanet.smartpy.io/")
  );
  const [wallet, setWallet] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  const [beaconConnection, setBeaconConnection] = useState(false);
  return (
    <div className="App">
      <h1 style={{ fontSize: "38px" }}>Crowdfunding</h1>
      <body>Crowdfuning DApp on Tezos Blockchain</body>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            margin: "20px 10px 10px 10px",
            backgroundColor: "#1976D2",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          <div style={{ margin: "4px" }}>
            <b>Start A Project</b>
          </div>
        </button>
        {userAddress === "" && !beaconConnection ? (
          <ConnectButton
            Tezos={Tezos}
            setWallet={setWallet}
            setUserAddress={setUserAddress}
            setUserBalance={setUserBalance}
            setBeaconConnection={setBeaconConnection}
            wallet={wallet}
          />
        ) : (
          <DisconnectButton
            wallet={wallet}
            setUserAddress={setUserAddress}
            setUserBalance={setUserBalance}
            setWallet={setWallet}
            setTezos={setTezos}
            setBeaconConnection={setBeaconConnection}
            userBalance={userBalance}
            userAddress={userAddress}
          />
        )}
      </div>

      <h1
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
        }}
      >
        Projects
      </h1>
      <ProjectOngoing />
      <ProjectOngoing />
      <ProjectOngoing />
      <ProjectOngoing />
    </div>
  );
}

export default App;
