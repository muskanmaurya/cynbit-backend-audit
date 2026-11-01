
import { z } from "zod";

// Shared email validation for public-facing forms.
export const BaseEmailSchema = z
  .string()
  .trim()
  .email("Invalid email format")
  .max(254, "Email address is too long");

// Contact form validation.
export const ContactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),

  email: BaseEmailSchema,

  company: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(150),

  industry: z
    .string()
    .trim()
    .min(1, "Industry selection is required")
    .max(100),

  message: z
    .string()
    .trim()
    .min(10, "Message must contain at least 10 characters")
    .max(2000, "Message must not exceed 2000 characters"),
});

// Services inquiry form validation.
export const ServicesFormSchema = z.object({
  fullName: z.string().trim().min(2).max(100),

  email: BaseEmailSchema,

  companySize: z.string().trim().min(1).max(50),

  serviceNeeded: z.string().trim().min(1).max(100),

  message: z.string().trim().min(2).max(2000),

  // Normalize standard HTML checkbox submissions.
  agreedToTerms: z
    .preprocess(
      (value) => value === "on" || value === true,
      z.boolean()
    )
    .refine(
      (value) => value,
      "You must agree to the terms"
    ),
});

// Newsletter subscription validation.
export const NewsletterSchema = z.object({
  email: BaseEmailSchema,
});
