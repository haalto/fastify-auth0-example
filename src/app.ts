import Fastify, { FastifyServerOptions } from "fastify";
import { todoRoutes } from "./routes/todoRoutes";
import fastifySensible from "@fastify/sensible";
import fastifyAuth0Verify from "fastify-auth0-verify";
import { Config } from "./config";
import { verify } from "./auth/verify";

export const app = (config: Config, opts?: FastifyServerOptions) => {
  const app = Fastify(opts);
  // Plugins
  app.register(fastifySensible);
  app.register(fastifyAuth0Verify, {
    domain: config.auth.issuer,
    audience: config.auth.audience,
  });

  // Hooks
  app.addHook("onRequest", verify);

  // Routes
  app.register(todoRoutes, { prefix: "/api/todos" });

  return app;
};
