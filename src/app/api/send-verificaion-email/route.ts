import dbConnect from "@/lib/dbConnect";
import { mailsender } from "@/helpers/mailSender";
import { ApiError } from "@/helpers/apiError";
import ApiResponse from "@/helpers/apiResponse";
import bcrypt from "bcryptjs";
import OtpModel from "@/model/otp.models";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email } = await request.json();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOtp = await bcrypt.hash(otp, 10);
    const hashedEmail = await bcrypt.hash(email, 10);

    const newEntry = new OtpModel({
      email: hashedEmail,
      otp: hashedOtp,
    });

    await newEntry.save();

    const emailResoponse = sendVerificaionEmail(email, otp);

    console.log(emailResoponse);

    return Response.json(
      new ApiResponse(
        201,
        "Email registered successfully, Please verify your email"
      ),
      { status: 201 }
    );
  } catch (error:any) {
    console.error("Error while registering the email", error);
    return Response.json(new ApiError(500, "Error registering the email", error));
  }
}

async function sendVerificaionEmail(email: string, otp: string) {
  try {
    const mailResponse = await mailsender(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP for Peer</h1>
                <p>Here is your OTP code: ${otp}</p>`
    );
    if (!mailResponse) {
      throw new ApiError(500, "Error while sending the email");
    }
    console.log("Email sent successfully");
  } catch (error: any) {
    console.error("Error sending email", error);
    return Response.json(
      new ApiResponse(500, "Error while sending email", error),
      {
        status: 500,
      }
    );
  }
}
