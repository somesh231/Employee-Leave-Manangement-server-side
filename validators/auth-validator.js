const { z } = require("zod");

//creating an object schema

const signupSchema = z.object({
  name: z.string({ required_error: "Name is required" }).trim(),
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "username must be of atleast 3 characters" })
    .max(255, { message: "username must not be more than 255 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be of atleast 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be of atleast 10 characters" })
    .max(20, { message: "Phone must not be more than 20 characters" }),

  role: z.string({ required_error: "Role is required" }).trim(),
  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be of atleast 7 characters" })
    .max(18, { message: "Password must not be more than 18 characters" }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be of atleast 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be of atleast 7 characters" })
    .max(18, { message: "Password must not be more than 18 characters" }),
});

module.exports = { signupSchema, loginSchema };
