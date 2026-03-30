import z from "zod"

export const createPortfolioSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must not exceed 100 characters"),
  description: z.string().max(500, "Description must not exceed 500 characters"),
  liveLink: z.string().url("Please enter a valid URL"),
  githubLink: z.string().url("Please enter a valid URL"),
  techstack: z.array(z.string()).min(1, "At least one technology is required")
})
export const updatePortfolioSchema = z.object({
  title: z.string().min(1, "Title majburiy").max(100, "Title 100 ta belgidan oshmasin").optional(),
  description: z.string().max(500, "Description 500 ta belgidan oshmasin").optional(),
  liveLink: z.url("To'g'ri URL kiriting").optional(),
})

export type createPortfolioDto = z.infer<typeof createPortfolioSchema>
export type updatePortfolioDto = z.infer<typeof updatePortfolioSchema>
