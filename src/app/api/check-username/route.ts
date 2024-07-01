import dbConnect from "@/lib/dbConnect";
import { z } from "zod";
import UserModel from "@/model/user.models";
import { usernameValidation } from "@/schemas/signUp.schema";
import ApiResponse from "@/helpers/apiResponse";
import { ApiError } from "@/helpers/apiError";

const usernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username"),
    };
    //Now validating using zod
    const result = usernameQuerySchema.safeParse(queryParams);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        new ApiResponse(400, usernameErrors?.length > 0
            ? usernameErrors.join(", ")
            : "Invalid query parameters"),
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingVerifedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifedUser) {
      return Response.json(
        new ApiResponse(400, "Username is already taken"),
        { status: 400 }
      );
    }

    return Response.json(
      new ApiResponse(200, "Username is available"),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error while checking the username", error);
    return Response.json(
      new ApiError(500, "Error checking the username", error),
      { status: 500 }
    );
  }
}
