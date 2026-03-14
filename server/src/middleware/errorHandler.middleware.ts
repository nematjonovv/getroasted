import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { ZodError } from "zod";

// Custom Error Class
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "AppError";
  }
}


export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. Zod validation xatosi
  if (err instanceof ZodError) {
    const formattedErrors: Record<string, string[]> = {};

    err.issues.forEach((issue) => {
      const field = issue.path.join(".") || "general";
      if (!formattedErrors[field]) {
        formattedErrors[field] = [];
      }
      formattedErrors[field].push(issue.message);
    });

    return res.status(422).json({
      success: false,
      message: "Validation xatosi",
      errors: formattedErrors,
      statusCode: 422,
    });
  }

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Fayl hajmi 5mb kam bo'lishi kerak",
        errors: null,
        statusCode: 400,
      })
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        success: false,
        message: "Maksimum 5ta rasm yuklash mumkin",
        errors: null,
        statusCode: 400,
      })
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        success: false,
        message: `Noto'g'ri field nomi: ${err.field}`,  // qaysi field ekanini ko'rsatadi
      })
    }
    return res.status(400).json({
      success: false,
      message: err.message
    })
  }
  //  AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors ?? null,
      statusCode: err.statusCode,
    });
  }

  // JWT error
  if (err instanceof Error && err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Token yaroqsiz",
      errors: null,
      statusCode: 401,
    });
  }

  if (err instanceof Error && err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token muddati tugagan",
      errors: null,
      statusCode: 401,
    });
  }

  // Internal server error
  console.error("Internal server error❌❌❌:", err);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
    errors: null,
    statusCode: 500,
  });
};