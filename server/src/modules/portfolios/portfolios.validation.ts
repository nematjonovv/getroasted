import z from "zod"

export const createPortfolioSchema = z.object({
  title: z.string().min(1, "Title majburiy").max(100, "Title 100 ta belgidan oshmasin"),
  description: z.string().max(500, "Description 500 ta belgidan oshmasin"),
  liveLink: z.url("To'g'ri URL kiriting"),
  githubLink: z.url("To'g'ri URL kiriting"),
  techstack: z.array(z.string()).optional()
})
export const updatePortfolioSchema = z.object({
  title: z.string().min(1, "Title majburiy").max(100, "Title 100 ta belgidan oshmasin").optional(),
  description: z.string().max(500, "Description 500 ta belgidan oshmasin").optional(),
  liveLink: z.url("To'g'ri URL kiriting").optional(),
})

export type createPortfolioDto = z.infer<typeof createPortfolioSchema>
export type updatePortfolioDto = z.infer<typeof updatePortfolioSchema>