import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config/config";
import LoadingButton from "@mui/lab/LoadingButton";
import { Chip } from "@mui/material";

/**
 * @param {{Tezos: TezosToolkit}}
 */
function ProjectOngoing({ projectDetails, Tezos, userAddress }) {
  const [fundingList, setProjectFunding] = useState(null);
  const [contractBalance, setContractBalance] = useState(0);
  const [amountToFund, setAmountToFund] = useState(0);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const handleAmountToFundChange = (event) => {
    setAmountToFund(event.target.value);
  };

  const addFund = () => {
    setLoading1(true);
    Tezos.wallet.at(projectDetails.address).then((contract) => {
      console.log(contract.entrypoints);
      try {
        contract.methods
          .send_fund()
          .send({ amount: parseFloat(amountToFund) * 10 ** 6, mutez: true })
          .then((op) => {
            return op.confirmation();
          })
          .then((result) => {
            if (result.completed) {
              setLoading1(false);
              axios
                .get(config.API_URL_Project + projectDetails.address)
                .then((response) => {
                  setContractBalance(response.data.balance);
                });
              axios
                .get(
                  config.API_URL_Project + projectDetails.address + "/storage"
                )
                .then((response) => {
                  setProjectFunding(response.data.funding);
                });
            }
          });
      } catch (e) {
        console.log(e);
        setLoading1(false);
      }
    });
  };

  const withdraw = () => {
    setLoading2(true);
    Tezos.wallet.at(projectDetails.address).then((contract) => {
      console.log(contract.entrypoints);
      try {
        contract.methods
          .refund()
          .send()
          .then((op) => {
            return op.confirmation();
          })
          .then((result) => {
            if (result.completed) {
              setLoading2(false);
              axios
                .get(config.API_URL_Project + projectDetails.address)
                .then((response) => {
                  setContractBalance(response.data.balance);
                });
              axios
                .get(
                  config.API_URL_Project + projectDetails.address + "/storage"
                )
                .then((response) => {
                  setProjectFunding(response.data.funding);
                });
            }
          });
      } catch (e) {
        console.log(e);
        setLoading2(false);
      }
    });
  };

  useEffect(() => {
    const getProjectInfo = () => {
      console.log(config.API_URL_Project + projectDetails.address + "/storage");
      axios
        .get(config.API_URL_Project + projectDetails.address + "/storage")
        .then((response) => {
          setProjectFunding(response.data.funding);
        });
      axios
        .get(config.API_URL_Project + projectDetails.address)
        .then((response) => {
          setContractBalance(response.data.balance);
        });
    };
    getProjectInfo();
  }, [projectDetails.address]);

  return (
    <div
      style={{
        height: "250px",
        width: "100%",
        padding: "15px",
        backgroundColor: "white",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {new Date(projectDetails.data.endTime) > Date.now() ? (
          <Chip
            style={{
              backgroundColor: "#1976D2",
              marginRight: "15px",
              color: "white",
            }}
            label="Ongoing"
          />
        ) : contractBalance >= projectDetails.data.goalAmount ? (
          <Chip
            style={{
              backgroundColor: "#19D266",
              marginRight: "15px",
              color: "white",
            }}
            label="Ended"
          />
        ) : (
          <Chip
            style={{
              backgroundColor: "#D21932",
              marginRight: "15px",
              color: "white",
            }}
            label="Failed"
          />
        )}

        <h2 style={{ margin: 0 }}>{projectDetails.data.name}</h2>
      </div>
      <div style={{ margin: "10px 0px 10px 0px" }}>
        {projectDetails.data.description}
      </div>
      <div style={{ margin: "10px 0px 10px 0px" }}>
        Time: {new Date(projectDetails.data.endTime).toUTCString()}
      </div>
      <div style={{ margin: "10px 0px 15px 0px" }}>
        Funded <b>{contractBalance / 10 ** 6} Tez</b> out of goal of{" "}
        <b>{projectDetails.data.goalAmount / 10 ** 6} Tez</b>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <input
          type="text"
          onChange={handleAmountToFundChange}
          placeholder="Amount in Tez"
          style={{ padding: "6px" }}
        />
        <LoadingButton
          loading={loading1}
          onClick={addFund}
          variant="contained"
          style={{
            margin: "0px 10px 0px 10px",
          }}
        >
          Fund Project
        </LoadingButton>
        {fundingList && fundingList.hasOwnProperty(userAddress) && (
          <LoadingButton
            loading={loading2}
            onClick={withdraw}
            variant="contained"
            style={{
              margin: "0px 10px 0px 10px",
            }}
          >
            Withdraw {fundingList[userAddress] / 10 ** 6} Tez
          </LoadingButton>
        )}
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <b>0 Tez</b>
        <ProgressBar
          completed={(contractBalance / projectDetails.data.goalAmount) * 100}
          customLabel={` ${contractBalance / 10 ** 6} Tez`}
          margin="10px"
          width="55rem"
          bgColor="#1976D2"
        />
        <b>{projectDetails.data.goalAmount / 10 ** 6} Tez</b>
      </div>
    </div>
  );
}

export default ProjectOngoing;
