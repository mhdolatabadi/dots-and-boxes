const production  = process.env.NODE_ENV === "production"
export const defaultConfig = {
  server: {
    host: production ? "localhost" : undefined, // all IPs
    port: 3000,
  },
};
