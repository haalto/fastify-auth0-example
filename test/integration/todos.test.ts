import { app } from "../../src/app";
import { EitherAsync, Just } from "purify-ts";
import { getTodoService, TodoService } from "../../src/services/todoService";
import { config } from "../setup";

jest.mock("../../src/services/todoService");

// Mock verify middleware
jest.mock("../../src/auth/verify", () => ({
  verify: jest.fn().mockImplementation((req, res, next) => next()),
}));

const mGetTodoService = jest.mocked(getTodoService);

describe("Todo routes", () => {
  const mTodoService: TodoService = {
    listTodos: jest
      .fn()
      .mockReturnValue(EitherAsync(() => Promise.resolve([]))),
    findTodoById: jest.fn().mockReturnValue(
      EitherAsync(() =>
        Promise.resolve(
          Just({
            id: 1,
            title: "test",
            userId: 1,
            completed: false,
          })
        )
      )
    ),
  };

  mGetTodoService.mockReturnValue(mTodoService);

  it("should return all todos", async () => {
    const testApp = app(config, { logger: true });

    const res = await testApp.inject({
      method: "GET",
      url: "/api/todos",
    });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toStrictEqual([]);
    testApp.close();
  });

  it("should return a todo by id", async () => {
    const testApp = app(config, { logger: true });

    const res = await testApp.inject({
      method: "GET",
      url: "/api/todos/1",
      headers: {
        authorization: "Bearer test",
      },
    });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toStrictEqual({
      id: 1,
      title: "test",
      userId: 1,
      completed: false,
    });
    testApp.close();
  });
});
