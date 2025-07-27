export const primordial = {
    id: 1043,
    name: "BlockDAG Testnet",
    network: "primordial",
    nativeCurrency: {
        name: "BlockDAG",
        symbol: "BDAG",
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ["https://rpc.primordial.bdagscan.com"],
        },
        public: {
            http: ["https://rpc.primordial.bdagscan.com"],
        },
    },
    blockExplorers: {
        default: { name: "BDAGScan", url: "https://primordial.bdagscan.com/" },
    },
    testnet: true,
}