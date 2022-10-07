import crypto, { CipherGCMTypes, CipherKey } from "crypto";

export const encryptPassword = (password: string): string => {
  const algorithm: CipherGCMTypes = "aes-256-gcm";
  const iv: Buffer = Buffer.alloc(16, 0);
  const securityKey: CipherKey = crypto.randomBytes(32);
  const cipher = crypto.createCipheriv(algorithm, securityKey, iv);

  let encryptedPassword = cipher.update(password, "utf8", "hex");
  encryptedPassword += cipher.final("hex");

  return encryptedPassword;
};
