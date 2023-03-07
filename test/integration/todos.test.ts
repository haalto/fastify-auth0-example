import { app } from "../../src/app";
import { EitherAsync, Just, Nothing } from "purify-ts";
import { getTodoService, TodoService } from "../../src/services/todoService";

jest.mock("../../src/services/todoService");

const mGetTodoService = jest.mocked(getTodoService);

describe("Todo routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
    const testApp = app({ logger: true });

    const res = await testApp.inject({
      method: "GET",
      url: "/api/todos",
    });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toStrictEqual([]);
    testApp.close();
  });

  it("should return a todo by id", async () => {
    const testApp = app({ logger: true });

    const res = await testApp.inject({
      method: "GET",
      url: "/api/todos/1",
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
