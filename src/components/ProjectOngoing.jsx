import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

function ProjectOngoing({ projectDetails }) {
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
          completed={60}
          margin="10px"
          width="60rem"
          bgColor="#1976D2"
        />
        <b>20 Tez</b>
      </div>
    </div>
  );
}

export default ProjectOngoing;
