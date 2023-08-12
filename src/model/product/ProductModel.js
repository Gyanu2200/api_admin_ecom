import ProductSchema from "./ProductSchema";

export const createProduct = (obj) => {
  return ProductSchema(obj).save();
};

export const getAllProduct = () => {
  return ProductSchema.find();
};

export const getSingleProduct = ({ filter }) => {
  return ProductSchema.findOne(filter);
};

export const updateProduct = ({ _id, ...updateObj }) => {
  return ProductSchema.findByIdAndUpdate(_id, updateObj, { new: true });
};

export const deleteSingleProduct = (_id) => {
  return ProductSchema.findByIdAndDelete(_id);
};

//idsArg must be an array of an _id
export const deleteProducts = (idsArg) => {
  return ProductSchema.deleteMany({
    _id: { $in: idsArg },
  });
};
