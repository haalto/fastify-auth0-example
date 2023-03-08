import { app } from "./app";
import { getConfig } from "./config";

const start = () => {
  const config = getConfig();

  if (config.isLeft()) {
    console.error(config.extract());
    process.exit(1);
  }

  config.map((config) => {
    const server = app(config, { logger: true });
    server.decorate("config", config);
    server.listen(
      { port: server.config.port, host: config.host },
      (error, address) => {
        if (error) {
          server.log.error(error);
          process.exit(1);
        }
        server.log.info(`server listening on ${address}`);
      }
    );
  });
};

start();
