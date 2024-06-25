import { ApiResponseInterface, Data } from "@/types/apiResponse.types"

class ApiResponse implements ApiResponseInterface{
    statusCode: number;
    success: boolean;
    message: string;
    data?: Data | undefined;

   constructor(statusCode: number, message = "Success", data?: Data) {
      this.statusCode = statusCode;
      this.success = statusCode < 400;
      this.message = message;
      this.data = data;
   }
}

export default ApiResponse;