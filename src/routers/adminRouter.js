import express from "express";
import { createAdminUser } from "../model/adminUser/AdminUserModel.js";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "../utils/bcrypts.js";
import { adminSignUpEmailVerification } from "../utils/email.js";

const router = express.Router();

//admin registration
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    req.body.password = hashPassword(req.body.password);
    req.body.verificationCode = uuidv4();
    const result = await createAdminUser(req.body);
    // we need to create unique url and sent email to the client
    const uniqueUrl = `http://localhost:3000/verify?c=${result.verificationCode}&email=${result.email}`;

    adminSignUpEmailVerification(result, uniqueUrl);

    if (result?._id) {
      res.json({
        status: "success",
        message:
          "We have sent an email verification link to your email. Please check your mail (junk as well if not found in email) and follow the instruction to activate your account.",
      });
      return;
    }
    res.json({
      status: "error",
      message: "you could not create user",
    });
  } catch (error) {
    error.errorCode = 500;
    if (error.message.includes()) next(error);
  }
});

//admin login

export default router;
