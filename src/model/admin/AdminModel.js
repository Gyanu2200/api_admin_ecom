import AdminUserSchema from "./AdminUserSchema.js";

//create admin user
export const createAdminUser = (adminObj) => {
  return AdminUserSchema(adminObj).save();
};

//login admin user (find user by filter, filter must be object)
export const loginAdminUser = (email) => {
  return AdminUserSchema.findOne({ email });
};

//find by filter and update
export const findAdminAndUpdate = (filter, obj) => {
  return AdminUserSchema.findOneAndUpdate(filter, obj, { new: true });
};
