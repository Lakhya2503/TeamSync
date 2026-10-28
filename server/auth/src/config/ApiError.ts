class ApiError extends Error {
  statusCode: number;
  success: boolean;
  data: null;
  errors: unknown[];

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: unknown[] = [],
    stack?: string,
  ) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;
    this.data = null;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
