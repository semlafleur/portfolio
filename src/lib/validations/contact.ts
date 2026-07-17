import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email"),
  message: z.string().trim().min(10, "Message is too short").max(2000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
