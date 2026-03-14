import { NextFunction, Request, Response } from "express";
import z from "zod";


export const ValidateBody = (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body)

  if (!result.success) {
    const errors = z.flattenError(result.error)
    return res.status(400).json({
      success: false,
      errors
    })
  }
  req.body = result.data
  next()
}

