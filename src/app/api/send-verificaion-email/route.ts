import dbConnect from "@/lib/dbConnect";
import { mailsender } from "@/helpers/mailSender";
import { ApiError } from "@/helpers/apiError";
import ApiResponse from "@/helpers/apiResponse";


export async function  POST(request:Request) {
    
}

async function sendVerificaionEmail(email: string, otp: string) {
    try {
        const mailResponse = await mailsender(
            email,
            "Verification Email",
                `<h1>Please confirm your OTP for Peer</h1>
                <p>Here is your OTP code: ${otp}</p>`
        );
        if(!mailResponse){
            throw new ApiError(500, "Error while sending the email");
        }
        console.log("Email sent successfully");

    } catch (error:any) {
        console.error("Error sending email", error)
        return Response.json(new ApiResponse(500 ,"Error while sending email", error), {
            status: 500
        })
        
    }
}