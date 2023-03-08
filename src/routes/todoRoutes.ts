import { FastifyInstance } from "fastify";
import { verify } from "../auth/verify";
import { todoCodec, todoListCodec } from "../codecs/todo";
import { getTodoController } from "../controllers/todoController";
import { getTodoService } from "../services/todoService";

export const todoRoutes = (server: FastifyInstance) => {
  const todoService = getTodoService(server.log);
  const todoController = getTodoController(todoService);

  server.get("/", {
    schema: {
      response: {
        200: todoListCodec.schema(),
      },
    },
    preValidation: verify,
    handler: todoController.getTodos,
  });

  server.get("/:id", {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
        },
      },
      response: {
        200: todoCodec.schema(),
      },
    },
    preValidation: verify,
    handler: todoController.getTodoById,
  });

  return server;
};
