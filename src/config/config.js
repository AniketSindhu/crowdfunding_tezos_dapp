var config = {
  contractAddress: "KT1HtPviRrXJhrExpQrtRzxu6TDzz3U3hxiz",
  get API_URL() {
    return `https://api.granadanet.tzkt.io/v1/contracts/${this.contractAddress}`;
  },
};

export default config;
