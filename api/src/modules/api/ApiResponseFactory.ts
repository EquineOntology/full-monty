import { ErrorResponse, FailureResponse, SuccessResponse } from "./types";

// Response payloads are based on the JSend spec https://github.com/omniti-labs/jsend (CF 19.01.22).
export default class ApiResponseFactory {
  static success(data: any): SuccessResponse {
    return {
      status: "success",
      data: data,
    };
  }

  static fail(data: any): FailureResponse {
    return {
      status: "fail",
      data: data,
    };
  }

  static error(
    message: string,
    code: number = 500,
    data?: object
  ): ErrorResponse {
    const response: ErrorResponse = {
      status: "error",
      message: message,
      code: code,
    };
    if (data) {
      response.data = data;
    }
    return response;
  }
}
