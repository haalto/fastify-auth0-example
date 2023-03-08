import { app } from "../../src/app";
import { config } from "../setup";

describe("test token authentication", () => {
  it("should return 401 if no token is provided", async () => {
    const testApp = app(config);

    const res = await testApp.inject({
      method: "GET",
      url: "/api/todos/1",
    });

    expect(res.statusCode).toBe(401);
    testApp.close();
  });
});
