export type SuccessResponse<T> = {
  isSuccess: boolean;
  message: string;
  statusCode: number;
  type: string;
  details: T;
};
