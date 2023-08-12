import Joi from "joi";

const EMAIL = Joi.string().email({ minDomainSegments: 2 }).required();
const SHORT_STR = Joi.string().max(100);
const LONG_STR = Joi.string().max(500);
const NUMBER = Joi.number();

export const validationProcessor = (req, res, next, schema) => {
  try {
    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error,
        })
      : next();
  } catch (error) {
    next(error);
    // console.log(error);
  }
};

//Admin Registration Validation
export const adminRegistrationValidation = (req, res, next) => {
  const schema = Joi.object({
    fName: SHORT_STR.required(),
    lName: SHORT_STR.required(),
    address: SHORT_STR.allow("", null),
    phone: SHORT_STR.allow("", null),
    email: EMAIL,
    password: SHORT_STR.min(6).required(),
  });

  return validationProcessor(req, res, next, schema);
};
