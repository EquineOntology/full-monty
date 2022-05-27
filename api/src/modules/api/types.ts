export type SuccessResponse = {
  status: "success";
  data: Record<string, any>;
};

export type FailureResponse = {
  status: "fail";
  data: Record<string, any>;
};

export type ErrorResponse = {
  status: "error";
  message: string;
  data?: Record<string, any>;
  code?: number;
};

export type ApiResponse = SuccessResponse | FailureResponse | ErrorResponse;
