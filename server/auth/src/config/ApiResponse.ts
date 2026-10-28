class ApiResponse<T = unknown> {
  statusCode: number;
  data: T;
  success: boolean;
  message: string;

  constructor(statusCode: number, data: T, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.success = statusCode < 400;
    this.message = message;
  }
}

export default ApiResponse;
