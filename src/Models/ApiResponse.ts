class ApiResponse {
    success: ApiResponseSuccess | null;
    error: ApiResponseError | null;
    data: any | null;
  
    constructor(success: ApiResponseSuccess | null, error: ApiResponseError | null, data: any | null) {
      this.success = success;
      this.error = error;
      this.data = data;
    }
}
  
class ApiResponseSuccess {
    code: number;
    content: string;
  
    constructor(code: number, content: string) {
      this.code = code;
      this.content = content;
    }
}
  
class ApiResponseError {
    code: number;
    content: string;
  
    constructor(code: number, content: any) {
      this.code = code;
      this.content = content;
    }
}
  
  export { ApiResponse, ApiResponseSuccess, ApiResponseError };
  