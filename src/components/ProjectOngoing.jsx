import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config/config";

function ProjectOngoing({ projectDetails }) {
  const [projectInfo, setProjectInfo] = useState(null);
  const [contractBalance, setContractBalance] = useState(0);
  useEffect(() => {
    const getProjectInfo = () => {
      console.log(config.API_URL_Project + projectDetails.address + "/storage");
      axios
        .get(config.API_URL_Project + projectDetails.address + "/storage")
        .then((response) => {
          setProjectInfo(response.data);
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
        <div
          style={{
            backgroundColor: "#1976D2",
            width: "fit-content",
            marginRight: "15px",
          }}
        >
          <div style={{ color: "white", margin: "8px" }}>Ongoing</div>
        </div>
        <h2 style={{ margin: 0 }}>{projectDetails.data.name}</h2>
      </div>
      <div style={{ margin: "10px 0px 10px 0px" }}>
        {projectDetails.data.description}
      </div>
      <div style={{ margin: "10px 0px 10px 0px" }}>
        Time: {new Date(projectDetails.data.endTime).toUTCString()}
      </div>
      <div style={{ margin: "10px 0px 15px 0px" }}>
        Goal of <b>{projectDetails.data.goalAmount / 10 ** 6} Tez</b>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <input
          type="text"
          placeholder="Amount in Tez"
          style={{ padding: "6px" }}
        />
        <button
          style={{
            margin: "0px 10px 0px 10px",
            backgroundColor: "#1976D2",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          <div style={{ margin: "4px" }}>Fund Project</div>
        </button>
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
