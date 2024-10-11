import {z} from 'zod'

export const signupInput=z.object({
    username:z.string().email(),
    password:z.string()
    .min(8, { message: "Password must be at least 8 characters long" }) // Minimum length
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }) // At least one uppercase letter
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }) // At least one lowercase letter
    .regex(/\d/, { message: "Password must contain at least one number" }) // At least one number
    .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character (@$!%*?&)" }) // At least one special character
    .refine((val) => !val.includes(' '), { message: "Password must not contain spaces" }) ,// No spaces allowed,
    name:z.string().optional()

})



export const signinInput=z.object({
    username:z.string().email(),
    password:z.string()
    .min(8, { message: "Password must be at least 8 characters long" }) // Minimum length
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }) // At least one uppercase letter
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }) // At least one lowercase letter
    .regex(/\d/, { message: "Password must contain at least one number" }) // At least one number
    .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character (@$!%*?&)" }) // At least one special character
    .refine((val) => !val.includes(' '), { message: "Password must not contain spaces" }) // No spaces allowed,
   
})

export const createBlogInput=z.object({
    title:z.string(),
    content:z.string()
})

export const updateBlogInput=z.object({
    title:z.string(),
    content:z.string(),
    id:z.string()
})
export type SignupInput=z.infer<typeof signupInput>
export type SigninInput=z.infer<typeof signupInput>
export type CreateBlogInput=z.infer<typeof createBlogInput>
export type UpdateBlogInput=z.infer<typeof updateBlogInput>




