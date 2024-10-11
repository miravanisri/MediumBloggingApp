"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string()
        .min(8, { message: "Password must be at least 8 characters long" }) // Minimum length
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }) // At least one uppercase letter
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }) // At least one lowercase letter
        .regex(/\d/, { message: "Password must contain at least one number" }) // At least one number
        .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character (@$!%*?&)" }) // At least one special character
        .refine((val) => !val.includes(' '), { message: "Password must not contain spaces" }), // No spaces allowed,
    name: zod_1.z.string().optional()
});
exports.signinInput = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string()
        .min(8, { message: "Password must be at least 8 characters long" }) // Minimum length
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }) // At least one uppercase letter
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }) // At least one lowercase letter
        .regex(/\d/, { message: "Password must contain at least one number" }) // At least one number
        .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character (@$!%*?&)" }) // At least one special character
        .refine((val) => !val.includes(' '), { message: "Password must not contain spaces" }) // No spaces allowed,
});
exports.createBlogInput = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string()
});
exports.updateBlogInput = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    id: zod_1.z.string()
});
