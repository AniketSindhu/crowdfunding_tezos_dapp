import "./App.css";
import ProjectOngoing from "./components/ProjectOngoing";
import { useEffect, useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import DisconnectButton from "./components/Wallet/DisconnectButton";
import ConnectButton from "./components/Wallet/ConnectButton";
import AddProject from "./components/AddProject";
import axios from "axios";
import config from "./config/config";
import { Switch, FormControlLabel } from "@mui/material";

function App() {
  const [Tezos, setTezos] = useState(
    new TezosToolkit("https://hangzhounet.smartpy.io/")
  );
  const [wallet, setWallet] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  const [beaconConnection, setBeaconConnection] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    getProjects();
  };

  const getProjects = () => {
    axios.get(`${config.API_URL}/storage`).then((res) => {
      setProjects(
        Object.keys(res.data).map((key) => {
          return {
            address: key,
            data: res.data[key],
          };
        })
      );

      setLoading(false);
    });
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="App">
      <h1 style={{ fontSize: "38px" }}>Crowdfunding</h1>
      <p>Crowdfuning DApp on Tezos Blockchain</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <button
          onClick={handleClickOpen}
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
          justifyContent: "space-between",
        }}
      >
        Projects{" "}
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChecked} />}
          label="Show My Projects"
        />
      </h1>
      {!checked
        ? projects.map((project) => (
            <ProjectOngoing
              projectDetails={project}
              key={project.address}
              Tezos={Tezos}
              userAddress={userAddress}
            />
          ))
        : projects.map(
            (project) =>
              project.data.owner === userAddress && (
                <ProjectOngoing
                  projectDetails={project}
                  key={project.address}
                  Tezos={Tezos}
                  userAddress={userAddress}
                />
              )
          )}
      ,
      <AddProject Tezos={Tezos} open={open} handleClose={handleClose} />
    </div>
  );
}

export default App;
