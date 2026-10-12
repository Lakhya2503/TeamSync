export interface ResponseType {
  statusCode: number;
  data?: object;
  message: string;
  success?: boolean;
}

export interface ApiErrorType {
  statusCode?: number;
  error?: [];
  message?: string;
  success?: boolean;
}
