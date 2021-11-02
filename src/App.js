import "./App.css";

function App() {
  return (
    <div className="App">
      <h1 style={{ fontSize: "38px" }}>Crowdfunding</h1>
      <body>Crowdfuning DApp on Tezos Blockchain</body>
      <button
        style={{
          margin: "20px 10px 10px 10px",
          backgroundColor: "#1976D2",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        <div style={{ margin: "4px" }}>Start A Project</div>
      </button>
      <h1
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
        }}
      >
        Projects
      </h1>
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
          <h2 style={{ margin: 0 }}>Sample Project</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
