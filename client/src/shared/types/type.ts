type FieldErrors = Record<string, string[]>;
export interface IErrorFields<T = FieldErrors> {
  success: boolean
  message: string
  statusCode: number
  errors: T | null
}
