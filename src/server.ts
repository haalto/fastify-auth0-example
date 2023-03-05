import { app } from "./app";

const start = () => {
  const server = app({ logger: true });
  server.listen({ port: 3000 }, (error, address) => {
    if (error) {
      server.log.error(error);
      process.exit(1);
    }
    server.log.info(`server listening on ${address}`);
  });
};

start();
