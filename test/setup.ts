import { Config } from "../src/config";

export const config: Config = {
  port: 3000,
  host: "localhost",
  auth: {
    audience: "test",
    issuer: "test",
  },
};
