import express from "express";
import { adminRegistrationValidation } from "../middleware/joiMiddleware.js";
import { hashPassword } from "../utils/bcrypts.js";
import { v4 as uuidV4 } from "uuid";
import { createAdminUser } from "../model/admin/AdminModel.js";
import { adminSignUpEmailVerification } from "../utils/email.js";

const router = express.Router();

//admin Registration

router.post("/", adminRegistrationValidation, async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    req.body.verificationCode = uuidV4();
    const result = await createAdminUser(req.body);
    if (result?._id) {
      //we need to create a unique url and send email to the client
      //process for the email
      const uniqueUrl = `http://localhost:9000/verify?c${result.verificationCode}&email=${result.email}`;

      //call email service
      adminSignUpEmailVerification(result, uniqueUrl);

      res.json({
        status: "success",
        message:
          "We have sent an email verification linkto your email. Please check your email and follow your instruction to activate your account",
      });
      return;
    }
    res.json({
      status: "error",
      message: "Unable to create new admin, Please try again later",
    });
  } catch (error) {
    error.errorCode = 500;
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.errorCode = 200;
      error.message =
        "There is already an account exist associated with this email";
    }
    next(error);
  }
});

export default router;
