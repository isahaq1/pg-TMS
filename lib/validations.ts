import { z } from "zod";

/**
 * Centralized Zod validation schemas for all forms.
 * Import from this file for consistent validation across the app.
 */

/** Sector form validation */
export const sectorFormSchema = z.object({
  title: z
    .string()
    .min(4, "Sector title must be at least 4 characters")
    .max(200, "Sector title must not exceed 200 characters"),
  group: z.string().optional(),
  details: z
    .string()
    .max(500, "Details must not exceed 500 characters")
    .optional(),
});

export type SectorFormValues = z.infer<typeof sectorFormSchema>;

/** Company form validation */
export const companyFormSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  officialEmail: z
    .string()
    .min(1, "Official email is required")
    .email("Invalid email address"),
  sector: z.string().min(1, "Sector is required"),
  administrator: z.string().optional(),
  companyAddress: z.string().optional(),
  websiteUrl: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Invalid URL format" }
    ),
  description: z.string().optional(),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;
