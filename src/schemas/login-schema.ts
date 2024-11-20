import { FORM_ERROR_AT_LEAST_ONE_LOWER, FORM_ERROR_AT_LEAST_ONE_NUMBER, FORM_ERROR_AT_LEAST_ONE_SPECIAL_CHAR, FORM_ERROR_AT_LEAST_ONE_UPPER, FORM_ERROR_INVALID_EMAIL, FORM_ERROR_NO_SPACES_ALLOWED, FORM_ERROR_REQUIRED_GENERIC, FORM_ERROR_TOO_LONG, FORM_ERROR_TOO_SHORT, FORM_MAX_CHAR, FORM_MIN_PASS_CHAR } from "@/constants/form"
import { REGEX_LOWERCASE, REGEX_NUMBER, REGEX_SPACES, REGEX_SPECIAL_CHAR, REGEX_UPPERCASE } from "@/constants/regex"
import { z } from "zod"

const loginSchema = z.object({
    email: z
        .string({ required_error: FORM_ERROR_REQUIRED_GENERIC })
        .email({ message: FORM_ERROR_INVALID_EMAIL })
        .max(FORM_MAX_CHAR, { message: FORM_ERROR_INVALID_EMAIL }),
    password: z.string({ required_error: FORM_ERROR_REQUIRED_GENERIC })
        .min(FORM_MIN_PASS_CHAR, { message: FORM_ERROR_TOO_SHORT })
        .max(FORM_MAX_CHAR, { message: FORM_ERROR_TOO_LONG })
        .regex(REGEX_UPPERCASE, { message: FORM_ERROR_AT_LEAST_ONE_UPPER })
        .regex(REGEX_LOWERCASE, { message: FORM_ERROR_AT_LEAST_ONE_LOWER })
        .regex(REGEX_NUMBER, { message: FORM_ERROR_AT_LEAST_ONE_NUMBER })
        .regex(REGEX_SPECIAL_CHAR, { message: FORM_ERROR_AT_LEAST_ONE_SPECIAL_CHAR })
        .refine(
            (password) => !REGEX_SPACES.test(password),
            { message: FORM_ERROR_NO_SPACES_ALLOWED }
        ),
})

type TLoginSchema = z.infer<typeof loginSchema>

export { loginSchema, type TLoginSchema }
