import { config } from "dotenv";
import { Codec, Either, number, Right, string } from "purify-ts";

export interface Config {
  port: number;
  host: string;
  auth: {
    audience: string;
    issuer: string;
  };
}

const envCodec = Codec.interface({
  PORT: string,
  HOST: string,
  AUTH_AUDIENCE: string,
  AUTH_ISSUER: string,
});

export const getConfig = (): Either<Error, Config> => {
  config();
  return envCodec
    .decode(process.env)
    .mapLeft((error) => new Error(error))
    .map((env) =>
      Right({
        port: parseInt(env.PORT, 10) || 3000,
        host: env.HOST,
        auth: { audience: env.AUTH_AUDIENCE, issuer: env.AUTH_ISSUER },
      })
    )
    .join();
};
