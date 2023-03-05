import { FastifyReply, FastifyRequest } from "fastify";
import { TodoService } from "../services/todoService";

const getTodos = async (req: FastifyRequest, res: FastifyReply) => {
  const todos = await TodoService(req.log).listTodos();
  todos
    .mapLeft((error) => res.status(500).send(error))
    .map((todos) => res.send(todos));
};

export { getTodos };
