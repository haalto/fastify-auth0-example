import Fastify, { FastifyServerOptions } from "fastify";

import { Config } from "./config";
import { configurePlugins } from "./plugins/configure";
import { configureRoutes } from "./routes/routes";

export const app = (config: Config, opts?: FastifyServerOptions) => {
  const app = Fastify(opts);
  configurePlugins(app, config);
  configureRoutes(app);
  return app;
};
