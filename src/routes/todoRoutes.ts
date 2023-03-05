import { FastifyInstance } from "fastify";
import { todoListCodec } from "../codecs/todo";
import { getTodos } from "../controllers/todoController";

export const todoRoutes = (server: FastifyInstance) => {
  server.get(
    "/",
    {
      schema: {
        response: {
          200: todoListCodec.schema(),
        },
      },
    },
    getTodos
  );
  return server;
};
