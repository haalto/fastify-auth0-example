import { EitherAsync } from "purify-ts/EitherAsync";
import axios from "axios";
import { Todo, todoCodec, todoListCodec } from "../codecs/todo";
import { FastifyBaseLogger } from "fastify";
import { Just, Maybe, Nothing, Right } from "purify-ts";
import { get } from "../utils/http";

interface TodoService {
  listTodos: () => EitherAsync<unknown, Todo[]>;
  findTodoById: (id: number) => EitherAsync<unknown, Maybe<Todo>>;
}

const getTodoService = (logger: FastifyBaseLogger): TodoService => {
  const listTodos = () => {
    logger.info("Fetching todos");
    return get(`https://jsonplaceholder.typicode.com/todos`)
      .map((response) => {
        logger.info("Todo fetched");
        return todoListCodec.decode(response.data);
      })
      .join();
  };

  const findTodoById = (id: number) => {
    logger.info("Fetching todo");
    return get(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .map((response) => {
        logger.info("Todo fetched");
        if (response.status === 404) {
          return Right(Nothing);
        }
        return todoCodec.decode(response.data).map((todo) => Just(todo));
      })
      .join();
  };

  return { listTodos, findTodoById };
};

export { TodoService, getTodoService };
