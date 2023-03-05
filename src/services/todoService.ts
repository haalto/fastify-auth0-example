import { EitherAsync } from "purify-ts/EitherAsync";
import axios from "axios";
import { todoListCodec } from "../codecs/todo";
import { FastifyBaseLogger } from "fastify";

export const TodoService = (logger: FastifyBaseLogger) => {
  const listTodos = () =>
    EitherAsync(async ({ liftEither, throwE }) => {
      try {
        logger.info("Fetching todos");
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        return liftEither(todoListCodec.decode(response.data));
      } catch (error) {
        return throwE(error);
      }
    }).run();

  return { listTodos };
};
