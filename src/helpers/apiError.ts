import { ApiErrorInterface } from "@/types/apiResponse.types"

class ApiError extends Error implements ApiErrorInterface {
    statusCode: number
    errors: any
    data: any
    success: boolean
    constructor(
        statusCode: number,
        message = "Something went wrong",
        errors = [],
        stack = "",
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
   
}

export {ApiError}