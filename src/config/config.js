var config = {
  contractAddress: "KT1QQNSLaYpJ8mRMRXCMjiYqYrCJPn8oXyRm",
  get API_URL() {
    return `https://api.hangzhou2net.tzkt.io/v1/contracts/${this.contractAddress}`;
  },
  API_URL_Project: "https://api.hangzhou2net.tzkt.io/v1/contracts/",
};

export default config;
