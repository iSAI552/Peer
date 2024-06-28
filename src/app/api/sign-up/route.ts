import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/model/user.models";
import bcrypt from "bcryptjs";
import { signUpSchema } from "@/schemas/signUp.schema";
import ApiResponse from "@/helpers/apiResponse";
import OtpModel from "@/model/otp.models";
import { ApiError } from "@/helpers/apiError";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, username, otp, password } = await request.json();
    const result = signUpSchema.safeParse({
      username,
      password,
      email,
      otp,
    });

    if (!result.success) {
      const signUpErrors = result.error.format()._errors;
      return Response.json(
        new ApiResponse(
          400,
          signUpErrors.length !== 0
            ? signUpErrors.join(", ")
            : "Invalid parameters"
        ),
        { status: 400 }
      );
    }

    const usernameExists = await UserModel.findOne({username})
    if(usernameExists){
        return Response.json(new ApiResponse(401, "Username is Already taken"), {status: 401});
    }

    const verifiedEmail = await OtpModel.findOne({email, otp, isVerified:false})

    if(!verifiedEmail) {
        return Response.json(new ApiResponse(400, "Incorrect Otp"), {status: 400})
    }

    verifiedEmail.isVerified = true;
    verifiedEmail.save();

    const hashedPassword = bcrypt.hash(password, 10);
    const {collegeName, logo} = await getCollegeName(email);

    const newUser: User = await UserModel.create({
        username,
        password: hashedPassword,
        collegeName,
        logo,
    })

    return Response.json(new ApiResponse(200, "User registered Successfully"), {status: 200})

  } catch (error: any) {
    console.error("Error while registering the user", error)
    return Response.json(new ApiError(500, "Error while registering the user", error))
  }
}

async function getCollegeName(email:string){
    return {
        collegeName: "IIT Hyderabad",
        logo: "https://www.gravatar.com/avatar",
    }
}
