import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import ApiResponse from "@/helpers/apiResponse";
import PostModel from "@/model/post.models";
import { ApiError } from "@/helpers/apiError";

export async function Post(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json(new ApiResponse(401, "Not Authenticated"), {
      status: 401,
    });
  }

  try {
    const { title, content, groupNames, instituteOnly, tags } =
      await request.json(); // check how to handel images and use cloudinary helper function.

    const newPost = await PostModel.create({
      title,
      content,
      groupNames,
      instituteOnly,
      tags,
      userId: session.user._id,
    });

    if (!newPost) {
      return Response.json(
        new ApiResponse(500, "Error while creating new Post document at DB"),
        { status: 500 }
      );
    }

    return Response.json(new ApiResponse(200, "Post created successfully"), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Error while making new Post", error);
    return Response.json(
      new ApiError(500, "Error while making new Post"),
      error
    );
  }
}
