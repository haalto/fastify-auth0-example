import Fastify, { FastifyServerOptions } from "fastify";
import { todoRoutes } from "./routes/todoRoutes";

export const app = (opts?: FastifyServerOptions) => {
  const app = Fastify(opts);
  // Plugins
  //await app.register(require("@fastify/sensible"));

  // Routes
  app.register(todoRoutes, { prefix: "/api/todos" });

  return app;
};
