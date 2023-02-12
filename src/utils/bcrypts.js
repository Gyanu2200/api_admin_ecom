import bcryptjs from "bcryptjs";

const salt = 15;

export const hashPassword = (plainPassword) => {
  return bcryptjs.hashSync(plainPass, salt);
};
