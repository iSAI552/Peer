import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import ApiResponse from "@/helpers/apiResponse";
import PostModel from "@/model/post.models";
import UserModel from "@/model/user.models";
import { ApiError } from "@/helpers/apiError";

export async function DELETE(
  request: Request,
  { params }: { params: { postId: string } }
) {
  await dbConnect();
  const postId = params.postId;

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !user) {
    return Response.json(new ApiResponse(401, "Not Authorized"), {
      status: 401,
    });
  }

  try {
    const deletedPost = await PostModel.deleteOne({ id: postId });
    const updatedResult = await UserModel.updateOne(
      { _id: user._id },
      {
        $pull: {
          posts: {
            _id: postId,
          },
        },
      }
    );

    if (updatedResult.modifiedCount == 0 || !deletedPost) {
      return Response.json(
        new ApiResponse(404, "Post not found or already deleted"),
        { status: 404 }
      );
    }

    return Response.json(new ApiResponse(201, "Post deleted successfully"), {
      status: 201,
    });
  } catch (error: any) {
    console.error("Error while deleting the Post", error);
    return Response.json(
      new ApiError(500, "Error while deleting the Post"),
      error
    );
  }
}
