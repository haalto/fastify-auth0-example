import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { EitherAsync } from "purify-ts";

export const verify = async (req: FastifyRequest, res: FastifyReply) => {
  await EitherAsync(async ({ throwE }) => {
    try {
      await req.jwtVerify();
    } catch (err) {
      throwE(err);
    }
  }).mapLeft((error) => {
    req.log.warn(error);
    res.unauthorized();
  });
};
