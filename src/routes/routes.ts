import { FastifyInstance } from "fastify";
import { todoRoutes } from "./todoRoutes";

export const configureRoutes = (app: FastifyInstance) => {
  app.register(todoRoutes, { prefix: "/api/todos" });
};
