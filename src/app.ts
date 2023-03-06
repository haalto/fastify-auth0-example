import Fastify, { FastifyServerOptions } from "fastify";
import { todoRoutes } from "./routes/todoRoutes";
import fastifySensible from "@fastify/sensible";

export const app = (opts?: FastifyServerOptions) => {
  const app = Fastify(opts);
  // Plugins
  app.register(fastifySensible);

  // Routes
  app.register(todoRoutes, { prefix: "/api/todos" });

  return app;
};
