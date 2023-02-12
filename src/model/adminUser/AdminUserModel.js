import AdminUserSchema from "./AdminUserSchema.js";

//create new user
export const createAdminUser = (obj) => {
  return AdminUserSchema(obj).save();
};

//find user by filter
export const findAdmin = (filter) => {
  return AdminUserSchema.findOne(filter);
};
