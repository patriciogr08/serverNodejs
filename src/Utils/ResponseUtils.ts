import { 
  ApiResponse, 
  ApiResponseSuccess,
  ApiResponseError 
} from '../Models/ApiResponse';

export function mapErrorResponse(code: number, content: string): ApiResponse {
  const error = new ApiResponseError(code, content);
  return new ApiResponse(null, error, null);
}

export function mapSuccessResponse(code: number, content: string, data: any): ApiResponse {
  const success = new ApiResponseSuccess(code, content);
  return new ApiResponse(success, null, data);
}