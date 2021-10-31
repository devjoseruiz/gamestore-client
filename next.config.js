module.exports = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    server_address: process.env.NEXT_PUBLIC_SERVER_ADDRESS,
    server_port: process.env.NEXT_PUBLIC_SERVER_PORT,
  },
};
