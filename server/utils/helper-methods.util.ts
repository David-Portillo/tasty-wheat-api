import { genSaltSync, hashSync, compareSync } from "bcrypt";

export const encryptInput = (input: string, saltRounds: number = 10): string => {
  const salt: string = genSaltSync(saltRounds);
  return hashSync(input, salt);
};

export const matchInput = (input: string, encryptedInput: string): boolean => {
  return compareSync(input, encryptedInput);
};
