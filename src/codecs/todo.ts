import { array, boolean, Codec, number, string } from "purify-ts/Codec";

export const todoCodec = Codec.interface({
  userId: number,
  id: number,
  title: string,
  completed: boolean,
});

export const todoListCodec = array(todoCodec);
