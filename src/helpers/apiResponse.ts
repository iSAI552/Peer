import { ApiResponseInterface, Data } from "@/types/apiResponse.types"

class ApiResponse implements ApiResponseInterface{
    statusCode: number;
    success: boolean;
    message: string;
    data?: any;

   constructor(statusCode: number, message = "Success", data?: any) {
      this.statusCode = statusCode;
      this.success = statusCode < 400;
      this.message = message;
      this.data = data;
   }
}

export default ApiResponse;